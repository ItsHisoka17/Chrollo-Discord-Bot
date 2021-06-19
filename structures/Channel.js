const Channel = require('discord.js').Structures.get('TextChannel');

class ExtendedChannel extends Channel {
    get memberCount(){
        return this.members.array().length;
    }
}

module.exports = ExtendedChannel;