const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class ClearQueue extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'clearqueue',
    category: 'Music',
    aliases: ['clearq'],
    description: 'Clears the queue for a server',
    usage: 'clearqueue',
})
}
async execute(message, client, args) {
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command') .setColor(this.embedColor));
   
    if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed() .setDescription('There are no songs being currently played') .setColor(this.embedColor));

    if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Unable to clear a queue with only 1 song`) .setColor(this.embedColor));

    client.player.clearQueue(message)
    message.channel.send(new Discord.MessageEmbed() .setDescription('Queue Succesfully cleared') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))

}
}

module.exports = ClearQueue;