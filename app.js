const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const { Result } = require('express-validator');

const app = express();

// app.use(bodyParser.urlencoded()); //x-www-form-urlencoded <form>
app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
    //CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    //Allowing Content-Type and Authorization Headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed',feedRoutes);

mongoose.connect('mongodb+srv://ShoppingApplication:Password@cluster0.3hs8ppr.mongodb.net',
{
    dbName: 'UpBlog',
}
)
.then(result => { 
    app.listen(8080);
})
.catch(err => {
    console.log(err);
})