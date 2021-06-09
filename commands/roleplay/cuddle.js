const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const Util = require('../../utils/utils')

class Cuddle extends Command {
    constructor(client){
    super(client, {
        name: 'cuddle',
        category: 'Fun',
        description: 'Cuddles someone',
        usage: 'cuddle <user>'
    })
    }
async execute(message, client, args){
    this.globalMessage(message)
    let user = message.mentions.users.first() || this.client.users.cache.find(u => u.username === args[0]) || message.author;
    let image = await Util.getNekoImage('cuddle')
    this.respond(new MessageEmbed() .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})) .setImage(image) .setFooter(`${user.username} Cuddles ${user.username}`) .setColor(this.embedColor))
}
}

module.exports = Cuddle;