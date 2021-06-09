const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Play extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'play',
    category: 'Music',
    aliases: ['p'],
    description: 'Plays a song',
    usage: 'play [song name | song url]',
})
}
async execute(message, client, args){
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.member.voice.channel.id == '800184453413994517') return;

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command'));

    if (!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription('Invalid Args: Song Name/URL not provided') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (!message.member.voice.channel.permissionsFor(client.user.id).has('SPEAK')) return message.channel.send(new Discord.MessageEmbed() .setDescription('I\'m unable to speak in that voice channel, please enable the permission for me and try again') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))

    client.player.play(message, args.join(" "), { firstResult: true });
    if (client.player.getQueue(message)){
    message.channel.send(new Discord.MessageEmbed() .setDescription(`Succesfully Added to Queue`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }    
}
}

module.exports = Play;