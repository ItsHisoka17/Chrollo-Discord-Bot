const { MessageEmbed } = require('discord.js');
const embedder = require('../../utils/multiEmbed')
const ytSearcher = require('yt-search');
const BaseCommand = require('../../structures/BaseCommand');

module.exports = class Search extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'search',
    category: 'Music',
    description: 'Searches youtube for a song',
    usage: 'search [song name | song author]',
})
}
async execute(message, client, args){
    if (!args.length) return message.channel.send(new MessageEmbed() .setDescription('Invalid args: Provide a song title') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    try {
        let query = args.join(' ')
        let embed = await message.channel.send(new MessageEmbed() .setDescription(`Searching for **${query}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        ytSearcher.search(query).then(res => {
            if (!res) return embed.edit(new MessageEmbed() .setDescription('No results found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            embed.delete()
            let i = 0;
            let ind = 0;
            let firstembed = new MessageEmbed()
            .setDescription(`Results for **${query}**\n\n${res.all.map(vid => `${i++}. **${vid.title}** - ${vid.duration}\n`).slice(1, 8).join('\n')}`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            .setFooter('Results 7/14');
            let secondEmbed = new MessageEmbed()
            .setDescription(`Results for **${query}**\n\n${res.all.map(vid => `${ind++}. **${vid.title}** - ${vid.duration}\n`).slice(8, 15).join('\n')}`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            .setFooter('Results 14/14');
            let embeds = []
            embeds.push(firstembed)
            embeds.push(secondEmbed)
            let slideShow = new embedder(embeds, 800000, message)
            slideShow.startMultiEmbeds()
        })

    } catch  {
        
    }
}
}