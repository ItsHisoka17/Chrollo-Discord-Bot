const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const { randomFromImgurAlbum } = require('../../utils/utils')

class Kill extends Command{
    constructor(client){
    super(client, {
    name: 'kill',
    category: 'Fun',
    description: 'Fantasy kills a user',
    usage: 'kill <user>',
})
}
async execute(message, client, args){
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args[0]) || message.author;
    let image = await randomFromImgurAlbum('YhwEI')
    message.channel.send(new MessageEmbed() .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})) .setImage(image) .setFooter(`${message.author.username} Kills ${user.username}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = Kill;