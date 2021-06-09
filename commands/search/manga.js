const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const Kitsu = require('kitsu.js')
const kitsu = new Kitsu()

class Manga extends Command {
    constructor(client){
    super(client, {
    name: 'manga',
    category: 'Search',
    description: 'Searches for a manga',
    usage: 'manga [manga title]',
})
}
async execute(message, client, args){
    let search = args.join(' ')
    if (!search) return message.channel.send(new MessageEmbed() .setDescription(`Invalid args, Usage: \`${this.usage}\``) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    message.channel.send(new MessageEmbed() .setDescription(`Searching for **${search}**...`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(async m => {
    let res = await kitsu.searchManga(search)
    if (res.length === 0) return m.edit(new MessageEmbed() .setDescription('0 results found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let manga = res[0];
    let embed = new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(`${manga.titles.english}`, manga.posterImage.original)
    .setDescription(manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
    .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${manga.titles.romaji}\n\•\u2000\**Age Rating:** ${manga.ageRating ? manga.ageRating : '`N/A`'}\n\•\u2000\**Chapters:** ${manga.chapterCount ? manga.chapterCount : '`N/A`'}`, true)
    .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${manga.averageRating ? manga.averageRating : '`N/A`'}\n\•\u2000\**Rating Rank:** ${manga.ratingRank ? manga.ratingRank : '`N/A`'}\n\•\u2000\**Popularity Rank:** ${manga.popularityRank ? manga.popularityRank : '`N/A`'}`, true)
    .addField('❯\u2000\Status', `•\u2000\**Volumes:** ${manga.volumeCount ? manga.volumeCount : '`N/A`'}\n\•\u2000\**Start Date:** ${manga.startDate}\n\•\u2000\**End Date:** ${manga.endDate ? manga.endDate : "Ongoing"}`, true)
    .setThumbnail(manga.posterImage.original);
    m.edit(embed)
})
}
}

module.exports = Manga;