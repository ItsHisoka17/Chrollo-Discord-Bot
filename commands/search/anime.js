const Discord = require('discord.js');
const Command = require('../../structures/BaseCommand')
const Kitsu = require('kitsu.js')
const kitsu = new Kitsu()

class Anime extends Command {
    constructor(client){
    super(client, {
    name: 'anime',
    category: 'Search',
    description: 'Searches for an anime',
})
}
async execute(message, client, args) {
    if (!args[0])return message.channel.send(new Discord.MessageEmbed() .setDescription('Proper Usage: `anime [Anime Name]`') .setColor(this.embedColor));

    var search = args.join(" ")
    let embedd = new Discord.MessageEmbed() .setDescription(`Searching for **${args.join(" ")}**...`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    let embed = await message.channel.send(embedd)
    kitsu.searchAnime(search)
    .then(async result => {
      var anime = result[0]  
            if (result.length === 0) {
                embed.edit(new Discord.MessageEmbed() .setDescription('No Results Found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                return;
            }
            embed.edit(
            new Discord.MessageEmbed()
            .setTitle(anime.titles.english?anime.titles.english:search.split(' ').map(w => `${w.split('').shift().toUpperCase()}${w.split('').slice(1).toLowerCase()}`).join(' '))
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            .setAuthor(anime.showType, anime.posterImage.original)
            .setDescription(`**Synopsis**:\n${anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]}`)
            .addField('Information:', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
            .addField('Stats:', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
            .addField('Status:', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
            .setThumbnail(anime.posterImage.original, 100, 200))
    })
        } 
}

module.exports = Anime;