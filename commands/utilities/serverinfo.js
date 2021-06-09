const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class ServerInfo extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'serverinfo',
    category: 'Utility',
    description: 'Shows info for your guild',
    usage: 'serverinfo',
})
}
async execute(message, client, args){
    const guild = message.guild
    const bots = guild.members.cache.filter(u => u.user.bot).array().length
    const roles = guild.roles.cache.size
    const emotes = guild.emojis.cache.size
    const icon = guild.iconURL({dynamic: true})
    const boostLevel = guild.premiumTier>0?`Tier ${guild.premiumTier}`:'No level'
    const boosts = guild.premiumSubscriptionCount>0?guild.premiumSubscriptionCount:'No Boosts'
    const channels = guild.channels.cache.size
    const textChannels = guild.channels.cache.filter(c => c.type == 'text')
    const voiceChannels = guild.channels.cache.filter(ch => ch.type == 'voice')
    const categories = guild.channels.cache.filter(x => x.type == 'category')
    const serverinfoEmbed = new Discord.MessageEmbed()
    .setAuthor(guild.name ,guild.iconURL({dynamic: true}))
    .setTitle('Server Info')
    .addField('Main Info:', `**Total Members:** ${guild.memberCount}\n**Bots:** ${bots}\n**Total Roles:** ${roles}\n**Total Emotes:** ${emotes}\n**Icon:** [Link](${icon})\n**Server Created At:** ${guild.createdAt.toDateString()}`, true)
    .addField('Other Info:', `**Boost Level:** ${boostLevel}\n**Boosts:** ${boosts}\n**Region:** ${guild.region}\n**Verification Level:** ${guild.verificationLevel.split('').shift()}${guild.verificationLevel.split('').slice(1).join('').toLowerCase()}`, true)
    .addField('Channels Info:', `**Total Channels:** ${channels}\n**Text Channels:** ${textChannels.size}\n**Voice Channels:** ${voiceChannels.size}\n**Categories:** ${categories.size}`, true)
    .setThumbnail(icon)
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    message.channel.send(serverinfoEmbed)
}
}

module.exports = ServerInfo;