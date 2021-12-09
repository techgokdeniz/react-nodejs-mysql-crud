const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

var mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "classicmodels"
});

mySqlConnection.connect((err) => {
    if (!err) {
        console.log("DB Connecttion");
    } else {
        console.log(err);
    }
})

const port = '3001';

app.listen(port, () => console.log('Express Runnig port', { port }));


app.get("/", (req, res) => {
    res.send("MySQL SampleDatabase API");
});

app.get('/employees', (req, res) => {
    mySqlConnection.query('SELECT * From employees', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err);
    })
});