const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const request = require('node-superfetch')
const { IMDB_API_KEY } = require('../../config.json')

class Show extends Command {
    constructor(client){
    super(client, {
    name: 'show',
    category: 'Search',
    description: 'Searches IMDB for a show',
    usage: 'show <title>',
})
}
async execute(message, client, args) {
    let query = args.join('-')
    if (!query) return message.channel.send(new MessageEmbed() .setDescription('Invalid args, What show are you looking for?') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    try {
        let embed = await message.channel.send(new MessageEmbed() .setDescription(`Searching for **${args.join(' ')}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        request
        .get(`http://www.omdbapi.com/?apikey=${IMDB_API_KEY}&type=series&t=${query}&r=json`)
        .then(res => {
            let data = res.body
            if (!data || !data.Title) return embed.edit(new MessageEmbed() .setDescription('0 results found | Response: False') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            embed.edit(
                new MessageEmbed()
                .setTitle(data.Title)
                .setDescription(`**Plot:**\n${data.Plot?data.Plot:'N/A'}`)
                .addFields(
                    {
                        name: 'Main info', value: `**>**Genre: ${data.Genre?data.Genre:'N/A'}\n**>**Year: ${data.Year?data.Year:'N/A'}\n**>**Rating: ${data.Rated?data.Rated:'N/A'}`, inline: true
                    },
                    {
                        name: 'Statistic', value: `**>**Country: ${data.Country?data.Country:'N/A'}\n**>**Seasons: ${data.totalSeasons}\n**>**Duration: ${data.Runtime?data.Runtime:'N/A'}`, inline: true
                    },
                    {
                        name: 'Other info', value: `**>**Directed by: ${data.Director?data.Director:'N/A'}\n**>**Writers: ${data.Writers?data.Writers:'N/A'}\n**>**Language: ${data.Language?data.Language:'English'}`, inline: true
                    }
                )
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                .setThumbnail(data.Poster?data.Poster:null)
            )
        })
    } catch (e) {
        this.respond(new MessageEmbed() .setDescription('An error occurred while searching for that show') .setColor(this.embedColor))
        console.error(e);
    }
}
}

module.exports = Show;