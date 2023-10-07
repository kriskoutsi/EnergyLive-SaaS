const Kafka = require('node-rdkafka');
const eventType2 = require('./Local_modules/eventType2.js');
const dict = require('./Local_modules/dictionaries');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//localhost's port
const port = process.env.PORT || 9104;

const app = express()

//Initialise a variable having our database's informations (it runs locally using xampp)
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'softeng2113',
    database: 'saas22agpt'
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

//getAgpt
app.get('/:date_from/:date_to/:area_name/:prod_type', (req,res) => {
	let word1 = req.params.area_name;
    let word2 = req.params.prod_type;
	let word3 = req.params.date_from;
	let word4 = req.params.date_to;
	let sqlquery = 'SELECT * FROM `agpt data load` WHERE AreaName = ? AND ProductionType = ? AND DateTime > ? AND DateTime < ?';
	const words = [word1, word2, word3, word4];
	con.query(sqlquery, words, function (err, result) {
	    if (err) throw  (res.json({"status" : "failed"}) && err);
	    res.send(result);
	});
});

let word3 = undefined;
let word4 = undefined;
let word5 = undefined;
let word6 = undefined;

consumer.on('ready', function() {
  consumer.subscribe(['agpt']);
  consumer.consume();
}).on('data', function(data) {
    word3 = dict.partition_areaName[data.partition.toString()];                   // AreaName from partition that the message came
    word4 = (JSON.parse(eventType2.fromBuffer(data.value))['productionType']); 
    word5 = (JSON.parse(eventType2.fromBuffer(data.value))['dateTime']);               // Datetime to string
    let sqlquery = ''
    if (JSON.parse(eventType2.fromBuffer(data.value))['actualGenerationOutput'] == '')
    {
        sqlquery = 'REPLACE INTO `agpt data load` (AreaName, ProductionType, DateTime, ActualGenerationOutput) VALUES ( ? , ? , ? , NULL )';
        const words = [word3, word4, word5];
        con.query(sqlquery, words, function (err, result) {
            if (err) throw err;
        });
    } else
    {
        word6 = parseFloat(JSON.parse(eventType2.fromBuffer(data.value))['actualGenerationOutput']); // Actual Total Load from string to int
        sqlquery = 'REPLACE INTO `agpt data load` (AreaName, ProductionType, DateTime, ActualGenerationOutput) VALUES ( ? , ? , ? , ? )';
        const words = [word3, word4, word5, word6];
        con.query(sqlquery, words, function (err, result) {
            if (err) throw err;
        });
    }
});


