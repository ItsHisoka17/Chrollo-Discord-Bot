const { Structures } = require('discord.js');
const Message = require('./Message');
const Channel = require('./Channel')


class Base {
    constructor(){
        Structures.extend('Message', () => Message)
        Structures.extend('TextChannel', () => Channel)
    }
}

module.exports = Base;