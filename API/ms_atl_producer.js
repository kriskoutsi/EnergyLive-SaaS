const Kafka = require('node-rdkafka');
const fs = require("fs");
const eventType = require('./Local_modules/eventType.js');
const dict = require('./Local_modules/dictionaries')

// DIRECTORY OF CSV FILES (FOR ATL)
const directoryPath = '../ATL_final'


var producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:19092, localhost:29092, localhost:39092',
    'dr_cb': true
});

// function sleep(time, callback) {
//     var stop = new Date().getTime();
//     while(new Date().getTime() < stop + time) {
//         ;
//     }
//     callback();
// }

// Connect to the broker manually
producer.connect();

// Wait for the ready event before proceeding
producer.on('ready', function() {
    try {
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 

            // PARSE ALL FILES IN THE DIRECTORY
            files.forEach(function (file) {
                
                //SENDS DATA EVERY 10 SECS
                    // READ CSV INTO STRING
                    var data = fs.readFileSync(directoryPath + "/" + file, "utf8");
                    
                    // STRING TO ARRAY
                    data = data.split("\n"); // SPLIT ROWS
                    for (let i in data) { // SPLIT COLUMNS
                        data[i] = data[i].split("\t");
                        if (data[i][3] == 'CTY') {  
                            const partition = dict.areaName_partition[data[i][4]];
                            const dateTime = data[i][0];
                            const TotalLoadValue = data[i][6];
                            const event = { dateTime, TotalLoadValue };
                            
                            let key = "key-"+i;
                            producer.produce(
                                // Topic to send the message to
                                'atl',
                                // optionally we can manually specify a partition for the message
                                // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
                                partition,
                                // Message to send. Must be a buffer
                                eventType.toBuffer(event),
                                // for keyed messages, we also specify the key - note that this field is optional
                                key,
                                // you can send a timestamp here. If your broker version supports it,
                                // it will get added. Otherwise, we default to 0
                                Date.now(),
                                // you can send an opaque token here, which gets passed along
                                // to your delivery reports
                            );
                            // We must either call .poll() manually after sending messages
                            // or set the producer to poll on an interval (.setPollInterval).
                            // Without this, we do not get delivery events and the queue
                            // will eventually fill up.
                            producer.poll();
                        }
                    }
            });
        });
        producer.disconnect();

    } catch (err) {
        console.error('A problem occurred when sending our message');
        console.error(err);
    }
});

// Any errors we encounter, including connection errors
producer.on('event.error', function(err) {
    console.error('Error from producer');
    console.error(err);
})

