const { MessageEmbed } = require('discord.js');
const fortuness = require('../../assets/Json Files/fortunes.json');
const BaseCommand = require('../../structures/BaseCommand');

class Fortune extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'fortune',
    category: 'Fun',
    description: 'Sends a random fortune',
    usage: 'fortune',
})
}
async execute(message, client, args) {
    let fortunesss = Math.floor(Math.random () * fortuness.length)
    let fortune = String([fortuness[fortunesss]])
    message.channel.send(new MessageEmbed() .setAuthor(message.author.username ,message.author.displayAvatarURL({dynamic: true})).setDescription(`**Your Fortune:**\n${fortune}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = Fortune;