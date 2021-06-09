const Discord = require('discord.js');
const Command = require('../../structures/BaseCommand')
const api = require('node-superfetch')

class Kiss extends Command {
    constructor(client){
    super(client, {
    name: 'kiss',
    category: 'Fun',    
    description: 'Kisses someone',
    usage: 'kiss <user>',
})
}
async execute(message, client, args) {
    const Mention = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args[0])
    let imagee = await api.get('https://nekos.life/api/v2/img/kiss')
    let kImage = imagee.body.url
    if (!Mention){
        const selfHug = new Discord.MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
    .setImage(kImage)
    .setFooter(`${message.author.username} Gets kissed`)
    message.channel.send(selfHug)
    return;
    }
    const hugsomeone = new Discord.MessageEmbed()
    .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
    .setImage(kImage)
    .setFooter(`${message.author.username} Kisses ${Mention.username}`)
    message.channel.send(hugsomeone)
}
}

module.exports = Kiss;