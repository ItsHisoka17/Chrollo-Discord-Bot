const Discord = require('discord.js');
const lyrics = require('lyrics-finder');
const BaseCommand = require('../../structures/BaseCommand');
const Utils = require('../../utils/utils')

class Lyrics extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'lyrics',
    category: 'Music',
    description: 'Shows lyrics for a song',
    usage: 'lyrics <song>',
})
}
async execute(message, client, args){
    if (!args[0]){
    if (client.player.isPlaying(message)){
        let embed = await message.channel.send(new Discord.MessageEmbed() .setDescription('Searching...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let SearchingLyrics = await lyrics(client.player.nowPlaying(message).title)
        let lyricss = Utils.shorten(SearchingLyrics, {amount: 2048, method: 'loop'})
        embed.edit(new Discord.MessageEmbed() .setDescription(lyricss?lyricss:'No results found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))) 
        return;
    } else {
        message.channel.send(new Discord.MessageEmbed() .setDescription('Invalid Args: Please Provide a song title') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    }
    let embed = await message.channel.send(new Discord.MessageEmbed() .setDescription(`Searching for **${args.join(" ")}**...`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let lyricsFound = await lyrics(args.join(" "))
        const toSend = Utils.shorten(lyricsFound, {amount: 2048, method: 'loop'})
    setTimeout(() => {
        embed.edit(new Discord.MessageEmbed() .setDescription(toSend) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }, 2000);
}
}

module.exports = Lyrics;