const { Client, Collection, MessageEmbed, Intents } = require("discord.js");
const path = require('path')
const Base = require('./Base')
const { joinDir } = require('../utils/utils')
const fs = require('fs');
const config = require('../config.json')
const { Player } = require('discord-player')
const glob = require('glob')
const Command = require('./BaseCommand')
let intentsArr = ['GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
let intents = new Intents();
intents.add(...intentsArr);

class Chrollo extends Client{
    constructor(options = {ws: {intents}}){
        super(options)
        options.ws = {}["intents"] = intents;
        new Base();
        const player = new Player(this, {leaveOnEnd: false, leaveOnEmptyCooldown: 120000});
        require('discord-buttons')(this);
        this.emotes = {x: '❌',check: '✅'};
        this.commands = new Collection();
        this.events = new Collection();
        this.player = player;
        this.player.on('trackStart', (message, track) => message.channel.send(new MessageEmbed() .setDescription(`Now Playing: [${track.title}](${track.url})\nDuration: ${track.duration}\nRequestedBy: ${track.requestedBy}`) .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setThumbnail(track.thumbnail)))
        this.db = require('quick.db')
        this.dataBaseManager = require('./DatabaseManager')
        this.config = config;
    }
    get dirname(){
    return `${path.dirname(require.main.filename)}${path.sep}` 
    }
    loadCommands(){
        glob(`${this.dirname}/commands/**/*.js`, (err, files) => {

            if (err) throw new Error(er);

            for (const file of files) {
                delete require.cache[[`${file}`]];
                const command = new (require(file))(this),
                      filename = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
                if (!(command instanceof Command))
                    throw new TypeError(`${filename} Has an invalid structure`);
                this.commands.set(command.name, command);
            }
        })
    }
    loadEvents(){
        fs.readdir('events', (err, files) => {
            if (err) return console.error(err); 
            files.forEach(file => {
                const eventFunction = require(joinDir('..', 'events', file));
                if (eventFunction.disabled) return; 
                const event = eventFunction.event || file.split('.')[0];
                const emitter = (typeof eventFunction.emitter === 'string' ? this[eventFunction.emitter] : eventFunction.emitter) || this;
                const once = eventFunction.once; 
                try {
                    emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(this, ...args));
                } catch (error) {
                    console.error(error.stack);
                }
            });
        });
    }
    init(){
        this.loadEvents()
        this.loadCommands()
        this.login(config.token)
    }
    getEmoji(id, client){
        let emoji = client.emojis.cache.get(id)
        return emoji;
    }
    /**
     * 
     * @param {string} text
     * @returns {string | boolean}
     */
    parseMention(text){
        if (/^<@!?(([0-9]){17,18})>$/gm.exec(text)){
            return /^<@!?(([0-9]){17,18})>$/gm.exec(text)[1]
        } else {
            return false;
        }
    }
}
module.exports = Chrollo;