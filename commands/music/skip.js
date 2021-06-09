const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

module.exports = class Skip extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'skip',
    category: 'Music',
    description: 'Skips Currently playing song',
    usage: 'skip',
})
}
async execute(message, client, args) {
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command'));
   
    if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed() .setDescription('There are no songs being currently played'));

    client.player.skip(message)
    message.channel.send(new Discord.MessageEmbed() .setDescription('Song Skipped') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}