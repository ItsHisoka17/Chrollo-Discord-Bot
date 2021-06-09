const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const { sendHttpRequest } = require('../../utils/utils')

class Hug extends Command {
    constructor(client){
    super(client, {
    name: 'hug',
    category: 'Fun',    
    description: 'Gives a hug',
    usage: 'hug <user>',
})
}
async execute(message, client, args) {
    const Mention = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args[0]) 
    let hug = await sendHttpRequest('https://nekos.life/api/v2/img/hug')
    let hugImage = hug.url
    if (!Mention){
        const selfHug = new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
    .setImage(hugImage)
    .setFooter(`${message.author.username} Hugs Themself, kinda weird wouldn't you say?`)
    message.channel.send(selfHug)
    return;
    }
    const hugsomeone = new MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
    .setImage(hugImage)
    .setFooter(`${message.author.username} Gives ${Mention.username} a Nice hug`)
    message.channel.send(hugsomeone)
}
}

module.exports = Hug;