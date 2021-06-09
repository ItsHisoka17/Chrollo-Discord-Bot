const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand')

class DisabledCommands extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'disabledcommands', 
    category: 'Configurations', 
    description: 'Shows disabled commands for your guild', 
    usage: 'disabledcommands',
    })
}
async execute(message, client, args){
        message.channel.send(new MessageEmbed() .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})) .setTitle('Disabled Commands') .setDescription(`${Array.isArray(client.db.get(`disabledcommands,${message.guild.id}`)) && client.db.get(`disabledcommand,${message.guild.id}`)!==null?client.db.get(`disabledcommands,${message.guild.id}`).map(c => `\`${c}\``).join('\n'):'You have no disabled commands'}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = DisabledCommands;