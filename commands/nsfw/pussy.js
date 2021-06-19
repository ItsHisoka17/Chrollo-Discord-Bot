const { MessageEmbed } = require('discord.js');
const fetch = require('node-superfetch')
const { TOPGG_AUTH_TOKEN } = require('../../config.json');
const BaseCommand = require('../../structures/BaseCommand');


module.exports = class Pussy extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'pussy',
    category: 'NSFW',
})
}
async execute(message, client, args) {
    this.globalMessage(message)
    let db = client.db;
    if (!message.channel.nsfw){
        this.inlineReply(new MessageEmbed() .setDescription('This command can only be used in NSFW channels') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    let nsfwStatus = db.get(`nsfw_${message.guild.id}`)
    if (nsfwStatus !== null){
        this.inlineReply(new MessageEmbed() .setDescription('NSFW Commands are Disabled') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    let topgg = await fetch
    .get(`https://top.gg/api//bots/803362044048572456/check?userId=${message.author.id}`)
    .set("Authorization", TOPGG_AUTH_TOKEN)
    let voted = topgg.body.voted>0?true:false
    if (voted === false){
        return this.inlineReply('You need to vote for me real quick before using NSFW commands: https://top.gg/bot/803362044048572456/vote')
    }
    let result = await fetch.get('https://nekos.life/api/v2/img/pussy')
    message.channel.send(new MessageEmbed() 
    .setImage(result.body.url)
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setFooter(`${message.author.username} Here, get some porn`,message.author.displayAvatarURL({dynamic: true}))
    )
}
}