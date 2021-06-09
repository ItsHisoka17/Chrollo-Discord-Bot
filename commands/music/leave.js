const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Leave extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'leave',
    category: 'Music',
    description: 'Leaves the voice channel and destroys the queue',
    aliases: ['dc', 'disconnect', 'stop'],
    usage: 'leave',
})
}
async execute(message, client, args){
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command'));

    await message.member.voice.channel.leave();
    message.channel.send(new MessageEmbed() .setDescription('Left voice channel. Queue destroyed') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = Leave;