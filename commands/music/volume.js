const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

module.exports = class Volume extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'volume',
    category: 'Music',
    aliases: ['vol'],
    description: 'Sets the volume for the queue',
    usage: 'volume <new volume>',
})
}
async execute(message, client, args){
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command'));
   
    if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed() .setDescription('There are no songs being currently played'));

    if (!args[0] || isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed() .setDescription('Invalid Args: Provide a Valid number between 1-150') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))

    if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 150) return message.channel.send(new Discord.MessageEmbed() .setDescription('Invalid Args: Provide a Valid number between 1-100') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))

    client.player.setVolume(message, parseInt(args[0]))
    message.channel.send(new Discord.MessageEmbed() .setDescription(`Volume Set to %${parseInt(args[0])}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}