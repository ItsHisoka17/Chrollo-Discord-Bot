const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const request = require('node-superfetch')
const { IMDB_API_KEY } = require('../../config.json');

class Movie extends Command {
    constructor(client){
    super(client, {
    name: 'movie',
    category: 'Search',
    description: 'Searches IMDB for a movie',
    usage: 'movie <title>',
})
}
async execute(message, client, args) {
    try {
        let title = args.join('-')
        if (!title) return message.channel.send(new MessageEmbed() .setDescription('Invalid args, you need to provide a movie title') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let embed = await message.channel.send(new MessageEmbed() .setDescription(`Searching for **${title}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        request
        .get(`http://www.omdbapi.com/?apikey=${IMDB_API_KEY}&r=json&type=movie&t=${title}`)
        .then(res => {
            if (!res.body || !res.body.Title) return embed.edit(new MessageEmbed() .setDescription('0 results found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            let data = res.body
            embed.edit(
                new MessageEmbed()
                .setTitle(data.Title)
                .setDescription(`**Plot:**\n${data.Plot}`)
                .addFields(
                    {
                        name: 'Year:', value: data.Year?data.Year:'N/A', inline: true
                    },
                    {
                        name: 'Age rating:', value: data.Rated?data.Rated:'N/A', inline: true
                    },
                    {
                        name: 'Genre:', value: data.Genre, inline: true
                    },
                    {
                        name: 'Duration:', value: data.Runtime?data.Runtime:'N/A', inline: true
                    },
                    {
                        name: 'Directed By:', value: data.Director, inline: true
                    },
                    {
                        name: 'Productions:', value: data.Production, inline: true
                    }
                )
                .setThumbnail(data.Poster?data.Poster:null)
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            )
        })
    } catch (e) {
        this.respond(new MessageEmbed() .setDescription(`An error occurred while searching for the movie`) .setColor(this.embedColor))
        throw e;
    }
}
}

module.exports = Movie;