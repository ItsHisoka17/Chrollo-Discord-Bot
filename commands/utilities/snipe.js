const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const DeletedMap = require('../../events/messageDelete').map

class Snipe extends Command {
    constructor(client){
    super(client, {
        name: 'snipe',
        category: 'Utility',
        description: 'Snipes a user (Shows last deleted message)',
        usage: 'snipe <user>'
    })
    }
async execute(message, client, args){
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let deleteMessage = DeletedMap.get(`${user.id},${message.guild.id}`)
    message.channel.send(
        new MessageEmbed()
        .setAuthor(user.user.tag, user.user.displayAvatarURL({dynamic: true}))
        .setDescription(`${deleteMessage?deleteMessage.content:'Not Found'}`)
        .setFooter(`Sniped By ${message.author.tag}`)
        .setColor(this.embedColor)
    )
}
}

module.exports = Snipe;