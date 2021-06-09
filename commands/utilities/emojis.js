const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Emojis extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'emojis',
    category: 'Utility',
    description: 'Shows all the emojis in a guild',
    usage: 'emojis',
})
}
async execute(message, client, args){
    let guild = client.guilds.cache.get(args[0]) || message.guild;
    let emojis = guild.emojis.cache.size>0?guild.emojis.cache.array().slice(0, 50).map(e => client.emojis.cache.get(e.id)).join(' '):'This server has no emojis'
    message.channel.send(
        new MessageEmbed()
        .setAuthor('Guild Emojis', guild.iconURL({dynamic: true}))
        .setDescription(`**Emojis for ${guild.name} (${guild.emojis.cache.size} Total)**\n\n${emojis}${guild.emojis.cache.size>50?` | **${guild.emojis.cache.size-50} More...**`:''}`)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    )
}
}

module.exports = Emojis;