const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const { uptime } = require('os')
const { readdirSync } = require('fs')
const { realTime } = require('../../utils/utils')
const { sendHttpRequest } = require('../../utils/utils')
const time = realTime(uptime()*1000)

class BotInfo extends Command{
    constructor(client){
    super(client, {
    name: 'botinfo',
    category: 'Bot',
    description: 'Shows Info about me',
    usage: 'botinfo',
})
}
async execute(message, client, args) {
    this.globalMessage(message);
    let request = await sendHttpRequest('https://top.gg/api//bots/803362044048572456', {headers: {'Authorization': client.config.TOPGG_AUTH_TOKEN}})
    const totalUpTime = `${time.days>0?`${time.days} Day${time.days>1?'s':''},`:''} ${time.hours} Hour${time.hours>1?'s':''}, ${time.minutes} Minute${time.minutes>1?'s':''} `
    const botinfoEmbed = new MessageEmbed()
    .setAuthor(this.client.user.tag ,this.client.user.displayAvatarURL())
    .setTitle(':robot: Bot info')
    .setDescription(`**[Invite](https://discord.com/api/oauth2/authorize?client_id=803362044048572456&permissions=8&scope=bot)** - **[Support Server](https://discord.gg/WhnmkwgtGb)** - **[Website](https://chrollo.xyz/)** - **[Top.gg](https://top.gg/bot/803362044048572456)**\n\n**My Developer:** ItsHisoka17#0017`)
    .addField('Total Servers:' ,this.client.guilds.cache.size, true)
    .addField('Total Users:' ,this.client.guilds.cache.reduce((a, g) => a + g.memberCount ,0) ,true)
    .addField('Total Channels:' ,this.client.channels.cache.size, true)
    .addField('Total Shards:', '0', true)
    .addField('Total Commands:', this.client.commands.filter(c => !c.ownerOnly).array().length, true)
    .addField('Total Uptime:', totalUpTime, true)
    .addField('Total EventListeners', readdirSync('events').length, true)
    .addField('Total Votes:', request.points, true)
    .addField('Monthly Votes:', request.monthlyPoints, true)
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter('Page 1/2')
    const botinfoEmbed1 = new MessageEmbed()
    .setAuthor(client.user.tag ,client.user.displayAvatarURL())
    .setTitle(':robot: Bot info')
    .addField('Database:', 'MySQL 8.0', true)
    .addField('API Library:', 'Discord.JS 12.5.3', true)
    .addField('Client created at:', `${this.client.user.createdAt.toDateString()}`, true)
    .addField('API Latency:', this.client.ws.ping, true)
    .addField('Response time:', `${Date.now() - message.createdTimestamp}ms`, true)
    .addField('Total Client files:', '127', true)
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setThumbnail(this.client.user.displayAvatarURL())
    .setFooter('Page 2/2')
    let embeds = [];
    embeds.push(botinfoEmbed)
    embeds.push(botinfoEmbed1)
    this.paginateEmbeds(embeds, 300000)
}
}
module.exports = BotInfo;