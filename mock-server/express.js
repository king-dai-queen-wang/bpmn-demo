const express = require('express')
const { json, urlencoded } = require('body-parser');
const app = express()
const port = 3000
const process = require('./routes/process');
const processDetail = require('./routes/processDetail');
/*app.all('*', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
})*/

app.use('/process', process);
app.use('/processDetail', processDetail);
app.use(urlencoded({
    extends: true
}));
app.use(json());
/*
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})