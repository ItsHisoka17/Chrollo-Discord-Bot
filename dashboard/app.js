const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const path = require("path");
const ejs = require("ejs");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const chalk = require("chalk");

module.exports.load = async (client) => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.engine("html", ejs.renderFile);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, "/views"));
    app.use(express.static(path.join(__dirname, "/public")));
    app.use(session({
        secret: "BotDashboardExample101",
        resave: false,
        saveUninitialized: false
    }));

    app.use(async function(req, res, next) {
        req.client = client;
        next();
    });

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
    passport.use(new Strategy({
        clientID: client.user.id,
        clientSecret: client.config.clientSecret,
        callbackURL: `${client.config.callbackURL}/login`,
        scope: [ "identify", "guilds" ],
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }))
    app.use("/", require("./routes/index"));
    let certificates = {
        key: require('fs').readFileSync('certificates/private.key'),
        cert: require('fs').readFileSync('certificates/certificate.crt')
    }
    require('https').createServer(certificates, app).listen(443);
    console.log(chalk.green('Web Panel Listening On Port 443'))
}