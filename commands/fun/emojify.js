const Discord = require('discord.js');
const dictionary = require('../../assets/Json Files/emojify.json')
const { letterTrans } = require('custom-translate');
const BaseCommand = require('../../structures/BaseCommand');

class Emojify extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'emojify',
    category: 'Fun',
    aliases: ['emoji'],
    description: 'Turns your text into Emojis',
    usage: 'emojify [text]',
})
}
async execute(message, client, args) {
    this.globalMessage(message)
    let query = letterTrans(args.join(" ").toLowerCase(), dictionary, ' ')
    for (let i = 0; i < query.length; i += 2000){
        const shortened = query.substring(i, Math.min(query.length, i + 2000))
    try {
        message.channel.send(new Discord.MessageEmbed() .setDescription('Emojifying Your Text...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        .then(embed => {
            setTimeout(() => {
                embed.edit(new Discord.MessageEmbed() .setDescription(shortened) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            }, 1000);
        })
    } catch (e){
        this.respond(new Discord.MessageEmbed() .setDescription('An error occurred while emojifying your message'))
    }
}
}
}

module.exports = Emojify;