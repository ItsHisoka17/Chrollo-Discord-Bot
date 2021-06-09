const { MessageEmbed } = require('discord.js')
const roasts = require('../../assets/Json Files/roasts.json')
const BaseCommand = require('../../structures/BaseCommand')

class Roast extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'roast',
    category: 'Fun',
    description: 'Roasts Someone',
    usage: 'roast [user]',
})
}
async execute(message, client, args) {
    this.globalMessage(message);
    let mention = message.mentions.members.first()
    let user = this.parseMention(args[0])
    console.log(user)
    if (!mention){
        message.channel.send(new MessageEmbed() .setDescription('Come on! You can\'t roast yourself') .setImage('https://media1.tenor.com/images/a8e603613db31c083c4127ab456311fa/tenor.gif?itemid=5737126') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    let roastss = Math.floor(Math.random () * roasts.length)
    let roast = String([roasts[roastss]])
    message.channel.send(new MessageEmbed() .setAuthor(message.author.username ,message.author.displayAvatarURL({dynamic: true})) .setDescription(roast) .setFooter(`${message.author.username} Roasts ${mention.user.username}`) .setImage('https://media1.tenor.com/images/17237206ba0508625aa3e4070ebfe140/tenor.gif?itemid=8269968') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = Roast;