const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const { randomFromImgurAlbum } = require('../../utils/utils')

class Punch extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'punch',
    category: 'Fun',
    description: 'Punches someone',
    usage: 'punch <user>',
})
}
async execute(message, client, args){
const mention = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args[0]) || message.author
let punchGif = await randomFromImgurAlbum('mZrp8')
const punchembed = new MessageEmbed()
.setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
.setImage(punchGif)
.setFooter(`${message.author.username} Punches ${message.mention}`)
.setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
message.channel.send(punchembed)
}
}

module.exports = Punch;