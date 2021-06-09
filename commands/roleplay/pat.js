const { MessageEmbed } = require('discord.js');
const api = require('node-superfetch');
const BaseCommand = require('../../structures/BaseCommand');

class Pat extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'pat',
    category: 'Fun',
    description: 'Pats someone',
    usage: 'pat <user>',
})
}
async execute(message, client, args) {
    const Mention = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args[0])
    let hug = await api.get('https://nekos.life/api/v2/img/pat')
    let hugImage = hug.body.url
    if (!Mention){
        const suicide = new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
    .setImage(hugImage)
    .setFooter(`${message.author.username} Gives themself a pat`)
    message.channel.send(suicide)
    return;
    }
    const Kill = new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
    .setImage(hugImage)
    .setFooter(`${message.author.username} Pats ${Mention.username}`)
    message.channel.send(Kill)
}
}

module.exports = Pat;