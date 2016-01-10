// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//USING SOCKET ON PORT 80
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(80);


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//Socket for dynamic data 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//SEND CAR DATA TO THE PANEL ON SOCKET CONNECTION
io.sockets.on('connection', function (socket) {
    // Client is connected
    socket.emit('message', 'You are connected !');
    console.log('Profile entered');
    setInterval(function () {
        var data = getRandomInt(15, 25);
        io.sockets.emit('pushtemp', data);
        data = getRandomInt(30, 35);
        io.sockets.emit('pusht1', data);
        data = getRandomInt(30, 35)
        io.sockets.emit('pusht2', data);
        data = getRandomInt(30, 35)
        io.sockets.emit('pusht3', data);
        data = getRandomInt(30, 35)
        io.sockets.emit('pusht4', data);
        data = getRandomInt(0, 100);
        io.sockets.emit('pushfuel', data);
    }, 2000);
});
// launch ======================================================================
app.listen(port);
console.log('Server on port ' + port);