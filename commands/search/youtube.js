const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const youtube_node = require('youtube-node')
const { youtubeApiKey } = require('../../config.json')
youtube = new youtube_node();
youtube.setKey(youtubeApiKey);
youtube.addParam('type', 'video');

class Youtube extends Command {
    constructor(client){
    super(client, {
    name: 'youtube',
    category: 'Search',
    aliases: ['yt'],
    description: 'Searches youtube for something',
    usage: 'youtube <title>',
})
}
async execute(message, client, args) {
    this.globalMessage(message)
    try {
    let query = args.join(" ")
    if (!query) return message.channel.send(new MessageEmbed() .setDescription(`Invalid Args, Provide a video name!`) .setColor(this.embedColor()))
    let embed = await this.inlineReply(`Searching for **${query}**...`)
    youtube.search(query, 1, async function(error, result) {
        if (error){
            message.channel.send(new MessageEmbed() .setDescription('Oops, an error occured. Try again in just a second!') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            return;
        }
        if (result.items.length < 1 || !result || !result.items){
            embed.edit('No Results found')
            return;
        } 
        if (!result.items[0].id.videoId){
            embed.edit('No Results found')
            return;
        } 
        embed.edit(`http://www.youtube.com/watch?v=${result.items[0].id.videoId}`)
    })
    } catch { (err)
        message.channel.send(new MessageEmbed() .setDescription('Oops, an error occured. Try again in just a second!') .setColor(this.embedColor()))
        console.error(err)
    }
}
}

module.exports = Youtube;