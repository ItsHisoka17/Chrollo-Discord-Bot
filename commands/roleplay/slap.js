const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const BaseCommand = require('../../structures/BaseCommand');

class Slap extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'slap',
    category: 'Fun',
    description: 'Slaps someone',
    usage: 'slap <user>',
})
}
async execute(message, client, args) {
     request
    .get(`https://nekos.life/api/v2/img/slap`)
    .then(res => {
        let img = res.body.url
    const Mention = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args[0])
    if (!Mention){
    message.channel.send(
    new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
    .setImage(img)
    .setFooter(`${message.author.username} Gets slapped right in their stupid face`)
    )
    return;
    }
    message.channel.send(
    new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
    .setImage(img)
    .setFooter(`${message.author.username} Slaps ${Mention.username} right in their stupid face`)
    )
})
}
}

module.exports = Slap;