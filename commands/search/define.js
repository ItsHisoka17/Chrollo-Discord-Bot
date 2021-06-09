const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const { WEBSTER_API_KEY } = require('../../config.json')
const { stripIndents } = require('common-tags')
const API = require('node-superfetch')

class Define extends Command {
    constructor(client){
    super(client, {
    name: 'define',
    category: 'Search',
    description: 'Finds the definition of a word',
    usage: 'define <word>',
})
}
async execute(message, client, args) {
    this.globalMessage(message)
    const word = args[0]
    if (!word) return message.channel.send(new MessageEmbed() .setDescription('Error, please provide a word') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    
    try {
        const { body } = await API
        .get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}`)
        .query({ key: WEBSTER_API_KEY })
        if (!body.length) return message.channel.send(new MessageEmbed() .setDescription(`No results found for **${word}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let data = body[0]
        if (typeof data === 'string') return message.channel.send(new MessageEmbed() .setDescription(`No results found for **${word}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
        message.channel.send(
            new MessageEmbed()
            .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
            .setDescription(stripIndents`
            **${data.meta.stems[0]}** (${data.fl})\n
            ${data.shortdef.map((definition, i) => `**${i + 1}.** ${definition}`).join('\n\n')}`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            
            )
    } catch (err) {
        this.respond(new MessageEmbed() .setDescription(`An error occurred while fetching the definition`) .setColor(this.embedColor))
    }
}
}

module.exports = Define;