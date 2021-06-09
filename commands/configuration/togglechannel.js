const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class ToggleChannel extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'togglechannel',
    category: 'Configurations',
    description: 'Disables all commands for a channel',
    usage: 'togglechannel <channel>',
})
}
async execute(message, client, args){
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
    let togCh = client.db.get(`toggleCh_${message.guild.id}`)
    if (!message.member.hasPermission('MANAGE_GUILD')){
        const embed = new MessageEmbed()
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setDescription('```Error: Missing permission: MANAGE_SERVER```')
      message.channel.send(embed)
      return;
      }
    if (togCh !== null){
        if (togCh.id == channel.id){
            message.channel.send(new MessageEmbed() .setDescription(`All commands enabled for <#${channel.id}>`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            client.db.delete(`toggleCh_${message.guild.id}`)
            return;
        } else {
            message.channel.send(new MessageEmbed() .setDescription(`All commands disabled for <#${channel.id}>`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            client.db.set(`toggleCh_${message.guild.id}` ,channel)
            return;
        }
    } else {
        message.channel.send(new MessageEmbed() .setDescription(`All commands disabled for <#${channel.id}>`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        client.db.set(`toggleCh_${message.guild.id}` ,channel)
    }
}
}

module.exports = ToggleChannel;