const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const BaseCommand = require('../../structures/BaseCommand');


class Waifu extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'waifu',
    category: 'Fun',
    description: 'Sends a waifu image',
    usage: 'waifu',
})
}
async execute(message, client, args){
        this.globalMessage(message);
        const { body } = await get('https://nekos.life/api/v2/img/waifu')
        this.inlineReply(
            new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setImage(body.url)
            .setFooter('Here\'s a waifu')
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
    }
}

module.exports = Waifu;