const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class LoopQueue extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'loopqueue',
    category: 'Music',
    aliases: ['loopq'],
    description: 'Loops Current playing queue',
    usage: 'loopqueue',
})
}
async execute(message, client, args) {
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command'));
   
    if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed() .setDescription('There are no songs being currently played'));

    if (client.player.getQueue(message).loopMode){
        client.player.setLoopMode(message, false)
        message.channel.send(new Discord.MessageEmbed() .setDescription('Loop disabled for the Queue') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    } else {
        client.player.setLoopMode(message, true);
        message.channel.send(new Discord.MessageEmbed() .setDescription('Loop enabled for the Queue') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
}
}

module.exports = LoopQueue;