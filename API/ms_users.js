const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


//localhost's port
const port = process.env.PORT || 9105;

const app = express()

//Initialise a variable having our database's informations (it runs locally using xampp)
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'softeng2113',
    database: 'saas22users'
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

//Extension
app.get('/extend/:extension/:email', (req,res) => {
	var word1 = req.params.extension;
	var word2 = req.params.email;
	let sqlquery = 'UPDATE `users` SET `Days_Left`= `Days_Left` + ? WHERE `Email`= ?';
	const words = [word1, word2];
	con.query(sqlquery, words, function (err, result) {
	    if (err) throw  (res.json({"status" : "failed"}) && err);
	    res.send(result);
	});
});

//Display Days Left
app.get('/:email', (req,res) => {
	var word1 = req.params.email;
	let sqlquery = 'SELECT `Days_Left` FROM `users` WHERE `Email`= ?';
	const words = [word1];
	con.query(sqlquery, words, function (err, result) {
	    if (err) throw  (res.json({"status" : "failed"}) && err);
	    res.send(result);
	});
});

//Add New User
app.get('/:firstname/:lastname/:email/:daysleft', (req,res) => {
	let word1 = req.params.firstname;
	let word2 = req.params.lastname;
	let word3 = req.params.email;
	let word4 = parseInt(req.params.daysleft);
	let sqlquery1 = 'SELECT Email FROM `users` WHERE Email = ?';
	con.query(sqlquery1, word3, function (err1, result1) {
		if (err1) throw  (res.json({"status" : "failed"}) && err1);
		if(result1 == '[]') {
			let sqlquery = 'INSERT INTO `users`(First_Name, Last_Name, Email, Days_Left) VALUES ( ? , ? , ? , ? )';
			const words = [word1, word2, word3, word4];
			con.query(sqlquery, words, function (err, result) {
				if (err) throw  (res.json({"status" : "failed"}) && err);
				res.send(result);
			});
		}
	});
	
});