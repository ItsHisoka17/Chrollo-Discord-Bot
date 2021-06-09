const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand')
const { randomFromImgurAlbum } = require('../../utils/utils')

class HighFive extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'highfive',
    category: 'Fun',
    description: 'Gives a high-five',
    aliases: ['uptop']
})
}
async execute(message, client, args){
        this.globalMessage(message)
        let image = await randomFromImgurAlbum('1Dotc')
        this.inlineReply(new MessageEmbed() .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setImage(image) .setFooter(`${message.author.username} High-Fives ${(message.mentions.users.first() || client.users.cache.find(u => u.username === args[0]) || message.author).username}`))
    }
}
module.exports = HighFive;