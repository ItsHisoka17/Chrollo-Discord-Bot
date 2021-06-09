const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

module.exports = class Remove extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'remove',
    description: 'Removes a song from the queue',
    category: 'Music',
    aliases: ['rm'],
    usage: 'remove [track number]',
})
}
async execute(message, client, args){
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command'));

    if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed() .setDescription('There are no songs currently playing') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    if (!args[0] || isNaN(args[0])) return message.channel.send(new MessageEmbed() .setDescription('Invalid args, Please provide a valid number') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))

    let track = args[0];
    if (track > client.player.getQueue(message).tracks.length) return message.channel.send(new MessageEmbed() .setDescription('Song not found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    await message.channel.send(new MessageEmbed() .setDescription(`Removed **${client.player.getQueue(message).tracks[track-1].title}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    await client.player.getQueue(message).tracks.splice(track - 1, 1)
}
}