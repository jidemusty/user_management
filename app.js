var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");
var session = require("express-session");
var dotenv = require('dotenv');


dotenv.load();


var routes = require('./routes');
var setUpPassport = require('./setuppassport');

var app = express();

dotenv.load();

mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");

app.use(express.static(path.resolve(__dirname, "static")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function() {
    console.log("Session started on port " + app.get("port") + "...");
});