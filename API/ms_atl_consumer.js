const Kafka = require('node-rdkafka');
const eventType = require('./Local_modules/eventType.js');
const dict = require('./Local_modules/dictionaries');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//localhost's port
const port = process.env.PORT || 9103;

const app = express()

//Initialise a variable having our database's informations (it runs locally using xampp)
let con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'softeng2113',
    database: 'saas22atl',
    port: 3306
});


//Initialise cors for frontend
let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: ["GET"]
}

app.use(cors(corsOptions));

//Initialise server
app.listen(port, () => console.log('Server is alive on http://localhost:' + port))

//Connect with the database 
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

let consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:19092, localhost:29092, localhost:39092',
}, {});

consumer.connect();

//getAtl
app.get('/:date_from/:date_to/:select_1', (req,res) => {
	var word1 = req.params.select_1;
	var word2 = req.params.date_from;
	var word3 = req.params.date_to;
	let sqlquery = 'SELECT * FROM `atl data load` WHERE AreaName = ? AND DateTime > ? AND DateTime < ?';
	const words = [word1, word2, word3];
	con.query(sqlquery, words, function (err, result) {
	    if (err) throw  (res.json({"status" : "failed"}) && err);
	    res.send(result);
	});
});

let word3 = undefined;
let word4 = undefined;
let word5 = undefined;

consumer.on('ready', function() {
  consumer.subscribe(['atl']);
  consumer.consume();
}).on('data', function(data) {
    word3 = dict.partition_areaName[data.partition.toString()];                   // AreaName from partition that the message came
    word4 = (JSON.parse(eventType.fromBuffer(data.value))['dateTime']);               // Datetime to string
    word5 = parseFloat(JSON.parse(eventType.fromBuffer(data.value))['TotalLoadValue']); // Actual Total Load from string to int
    let sqlquery = 'REPLACE INTO `atl data load` (AreaName, DateTime, TotalLoadValue) VALUES ( ? , ? , ? )';
    const words = [word3, word4, word5];
    con.query(sqlquery, words, function (err, result) {
        if (err) throw err;
    });
});


