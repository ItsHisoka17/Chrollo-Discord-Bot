const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

module.exports = class Shuffle extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'shuffle',
    category: 'Music',
    description: 'Shuffles the queue',
    usage: 'shuffle',
})
}
async execute(message, client, args) {
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command'));
    
    if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed() .setDescription('There are no songs being currently played'));

    if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Unable to Shuffle a queue with only 1 song`));
    client.player.shuffle(message)
    message.channel.send(new Discord.MessageEmbed() .setDescription('Shuffled the Queue') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}