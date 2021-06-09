const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Avatar extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'avatar',
    category: 'Utility',
    aliases: ['av'],
    description: 'Shows the avatar of a user',
    usage: 'avatar <user>',
})
}
async execute(message, client, args){
    let clientUser;
    if (args[0]){
        clientUser = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username === args[0]) || message.author;
    } else {
        clientUser = message.mentions.users.first() || message.author;
    }
    const avatar = clientUser.displayAvatarURL({dynamic : true, size: 2048})
    const embed = new MessageEmbed()
    .setAuthor(clientUser.tag ,clientUser.displayAvatarURL({dynamic: true}))
    .setDescription(`**[Avatar URL](${avatar}) | [Reverse-Search](https://images.google.com/searchbyimage?image_url=${avatar})**`)
    .setImage(avatar)
    .setFooter(`Requested By ${message.author.tag}`)
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    message.channel.send(embed)
}
}

module.exports = Avatar;