const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const BaseCommand = require('../../structures/BaseCommand');

class Poke extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'poke',
    category: 'Fun',
    description: 'Pokes someone',
    usage: 'poke <user>',
})
}
async execute(message, client, args){
    const Mention = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args[0])
    request
    .get(`https://nekos.life/api/v2/img/poke`)
    .then(res => {
        let data = res.body.url
        if (!Mention){
            message.channel.send(
                new MessageEmbed()
                .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
                .setImage(data)
                .setFooter(`${message.author.username}, Here is your poke gif`)
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            )
        }else{
            message.channel.send(
                new MessageEmbed()
                .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
                .setImage(data)
                .setFooter(`${message.author.username} Pokes ${Mention.username}`)
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            )
        }
    })
}
}

module.exports = Poke;