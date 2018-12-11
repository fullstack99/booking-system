const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./app/config/config.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.db.local, { useMongoClient: true });
// mongoose.connect(config.db.product, { useMongoClient: true });

const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
     	res.sendStatus(204);
    }
    else {
     	next();
    }
};


app.use(express.logger('dev'));
app.use(express.cookieParser());
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(express.session({ secret: 'wgv-app' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(allowCrossDomain);
app.use(cors());

require('./app/services/passport')(passport); // pass passport for configuration
require('./app/routes.js')(app, passport);

const port = process.env.PORT || 8080;
app.listen(port);
console.log('The magic happens on port ' + port);