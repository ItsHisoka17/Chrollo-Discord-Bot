const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class Hex extends Command {
    constructor(client){
    super(client, {
        name: 'hex',
        category: 'Utility',
        description: 'Displays the colour of a hex',
        usage: 'hex [code]'
    })
    }
async execute(message, client, args){
    this.globalMessage(message);
    if (!args.length) return this.respond(new MessageEmbed() .setDescription('Proper Usage: `hex [code]`') .setColor(this.embedColor))
    this.inlineReply(new MessageEmbed() .setDescription(`Hex Display For: **#${args[0].replace(/(#|0x)/, '')}**`) .setImage(`https://singlecolorimage.com/get/${args[0].replace(/(#|0x)/, '')}/500x200`) .setColor(this.embedColor))
}
}

module.exports = Hex;