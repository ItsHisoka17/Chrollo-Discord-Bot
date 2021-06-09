const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class Shop extends Command {
    constructor(client){
    super(client, {
        name: 'shop',
        category: 'Economy',
        description: 'Shows or Edits the roles shop for your server',
        aliases: ['store'],
        usage: 'shop <add | remove | display>',
        disabled: true
    })
    }
async execute(message, client, args){
    this.globalMessage(message);
    
}
}

module.exports = Shop;