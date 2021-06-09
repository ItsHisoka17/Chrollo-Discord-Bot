const express = require("express");
const router = express.Router();
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const passport = require("passport");
const checkAuth = require('../../checkAuth')

router.get("/", async(req, res) => {
    res.render("index", {
        tag: (req.user ? req.user.tag : "Login"),
        servers:  req.user?req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591):undefined,
        client: req.client,
        user: req.user || null,
    });
});



router.get("/login", passport.authenticate("discord", { failureRedirect: "/" }), async function(req, res) {
    if (!req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else res.redirect("/");
});

router.get("/logout", async function(req, res) {
    req.session.destroy(() => {
        req.logout();
        res.redirect("/");
    });
});

router.get("/servers", async function(req, res) {
    if (!req.user) return res.redirect('/')
    res.render("servers", {
    servers:  req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
    user: req.user || null,
    client: req.client || null
    })
})
router.get("/server/:guildID", checkAuth, async (req, res) => {
    let db = req.client.db;
    let server = req.client.guilds.cache.get(req.params.guildID);

    if (!server && req.user.guilds.filter(u => ((u.permissions & 2146958591) === 2146958591)).map(u => u.id).includes(req.params.guildID)) {
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=8&guild_id=${req.params.guildID}&redirect_uri=${encodeURIComponent(`http://chrollo.xyz/servers`)}`);  //Full Permissions Invite
    } else if (!server) {
        return res.redirect(`/servers`);
    };

    res.render("manage.ejs", {
        client: req.client,
        user: req.user || null,
        guild: server,
        createdAt: moment(req.user.createdAt).format("lll"),
        settings: db,
        guilds:  req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591)
    });
});

router.post("/server/:guildID", checkAuth, async (req, res) => {
    let server = req.client.guilds.cache.get(req.params.guildID);
    if (!server) return res.redirect("/servers");

let data = req.body;

if (data.hasOwnProperty("prefix")) {
    let newprefix;
    let prefix = req.client.db.get(`prefix_${server.id}`);
    if (!prefix || prefix == null) prefix = 'mk?';
    if (data.prefix.length > 0) newprefix = data.prefix;
    if (newprefix) req.client.db.set(`prefix_${server.id}`, newprefix);
};

await res.redirect(`/server/${req.params.guildID}`);
})

router.get('/profile', checkAuth, (req, res) => {
    res.render("profile", {
        user: req.user,
        client: req.client,
        settings: req.client.db,
        servers:  req.user?req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591):null,
    })
})
router.post('/set/:userID', checkAuth, async (req, res) => {
    let type = req.query["type"];
    switch(type.toLowerCase()){
        case 'bio': {
            req.client.db.get(`profile.${req.params.userID}`)?req.client.db.set(`profile.${req.params.userID}`, {status: req.client.db.get(`profile.${req.params.userID}`).status, bio: req.body.bio, bg: req.client.db.get(`profile.${req.params.userID}`).bg}):req.client.db.set(`profile.${req.params.userID}`, {status: null, bio: req.body.bio, bg: null})
            try {res.redirect('/profile')}catch{}
            break;
        }
        case 'bg-image': {
            req.client.db.get(`profile.${req.params.userID}`)?req.client.db.set(`profile.${req.params.userID}`, {status: req.client.db.get(`profile.${req.params.userID}`).status, bio: req.client.db.get(`profile.${req.params.userID}`).bio, bg: req.body.bg_image}):req.client.db.set(`profile.${req.params.userID}`, {status: null, bio: null, bg: req.body.bg_image})
            try {res.redirect('/profile')}catch{}
            break;
        }
    }
})
router.get('/avatar/:userID', (req, res) => {require('request').get(req.client.users.cache.get(req.params.userID)?req.client.users.cache.get(req.params.userID).displayAvatarURL({dynamic: true}):'https://cdn.discordapp.com/avatars/803362044048572456/fe8374f432a147d64a254d68c1b2e463.webp').pipe(res)})
router.get('/commands', (req, res) => res.render("commands", {user: req.user || null, servers:  req.user?req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591):null}))
router.get('/invite', (req, res) => res.redirect('https://discord.com/oauth2/authorize?client_id=803362044048572456&permissions=8&scope=bot'))
router.get('/support', (req, res) => res.redirect('https://discord.gg/WhnmkwgtGb'))

module.exports = router;