const express = require('express')
const app = express()
const { json, urlencoded } = require('body-parser');

const port = 3000
/*app.all('*', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
})*/


app.use(urlencoded({
    extends: true
}));
app.use(json());
app.use('/lowCode/process', require('./routes/lowCode/process'));
app.use('/lowCode/processDetail', require('./routes/lowCode/processDetail'));
app.use('/lowCode/dict', require('./routes/lowCode/dict'));
app.use('/lowCode/company', require('./routes/lowCode/company'));
// app.use('/lowCode/processDetail', require('./routes/lowCode/processDetail'))
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
});