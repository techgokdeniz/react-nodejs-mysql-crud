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
    database: "udemy"
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

app.get('/product', (req, res) => {
    mySqlConnection.query('SELECT * From sales', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err);
    })
});

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json());

app.post('/insert', (req, res) => {
    const UrunAdi = req.body.pname;
    const Adet = req.body.pnumber;
    const Fiyat = req.body.pprice;
    mySqlConnection.query('INSERT INTO sales (urunadi,adet,fiyat) VALUES (?,?,?)', [UrunAdi, Adet, Fiyat], (err, result) => {
        if (!err)
            res.send("Succes")
        else
            console.log(err);
    });
});

app.delete("/delete/:cell", (req, res) => {
    const deleteId = req.params.cell;
    mySqlConnection.query('DELETE FROM sales WHERE id=?', [deleteId], (err, result) => {
        if (!err)
            res.send("Succes")
        else
            console.log(err);
    });
})

app.get("/product/:id", (req, res) => {
    const ID = req.params.id;
    mySqlConnection.query('SELECT * From sales WHERE id=?', [ID], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else
            console.log(err);
    })
})

app.put("/product/:id", (req, res) => {
    const id = req.params.id;
    const urunadi = req.body.urunadi;
    const fiyat = req.body.fiyat;
    const adet = req.body.adet;

    mySqlConnection.query('UPDATE sales set urunadi=?,fiyat=?,adet=? WHERE id=?', [urunadi, fiyat, adet, id], (err, rows, fields) => {
        if (!err) {
            res.send("Success");
        } else
            console.log(err);
    })
})