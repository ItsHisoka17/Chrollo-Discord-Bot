const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const API = require('node-superfetch')

class Wikipedia extends Command {
    constructor(client){
    super(client, {
    name: 'wikipedia',
    category: 'Search',
    aliases: ['wiki'],
    description: 'Searches wikipedia for something',
    usage: 'wikipedia <text>',
})
}
async execute(message, client, args) {
    if (!message.channel.nsfw) return message.channel.send(new MessageEmbed() .setDescription('This command may contain nsfw content, Please only use it in nsfw channels') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m => m.delete({timeout:5000}))
    if (!args[0]) return message.channel.send(new MessageEmbed() .setDescription('Proper Usage: `wikipedia <text>`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    try {
        const search = args.join(' ')
        let embed = await message.channel.send(new MessageEmbed() .setDescription(`Searching Wikipedia for **${search}**...`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        const { body } = await API
        .get('https://en.wikipedia.org/w/api.php')
        .query({
            action: 'query',
				prop: 'extracts|pageimages',
				format: 'json',
				titles: search,
				exintro: '',
				explaintext: '',
				pithumbsize: 150,
				redirects: '',
				formatversion: 2,
                nsfw: false
        })
        const data = body.query.pages[0];
        if (data.missing) return embed.edit(new MessageEmbed() .setDescription('No results Found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        for(let i = 0; i < data.extract.length; i += 2048) {
            const toSend = data.extract.substring(i, Math.min(data.extract.length, i + 2048));
        setTimeout(() => {
            
        embed.edit(new MessageEmbed() 
        .setAuthor('Wikipedia', 'https://i.imgur.com/Z7NJBK2.png', 'https://www.wikipedia.org/')
        .setThumbnail(data.thumbnail ? data.thumbnail.source: null)
        .setDescription(toSend.replace(/\n/g, '\n\n'))
        .setURL(`https://en.wikipedia.org/wiki/${encodeURIComponent(search).replace(/\)/g, '%29')}`)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
    }, 1300);
        }
    } catch (e) {
        message.channel.send(new MessageEmbed() .setDescription('Oops, An error occured') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        console.error(e);
    }
}
}

module.exports = Wikipedia;