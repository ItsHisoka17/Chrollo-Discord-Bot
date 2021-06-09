const { MessageEmbed } = require('discord.js');
const API = require('node-superfetch')
const { TOPGG_AUTH_TOKEN } = require('../../config.json');
const BaseCommand = require('../../structures/BaseCommand');

module.exports = class Lesbian extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'lesbian',
    category: 'NSFW',
    aliases: ['lesb'],
})
}
async execute(message, client, args) {
    this.globalMessage(message)
    let data = client.db;
    if (!message.channel.nsfw){
        this.inlineReply(new MessageEmbed() .setDescription('This command can only be used in NSFW channels') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    const nsfwStatus = data.get(`nsfw_${message.guild.id}`)
    if (nsfwStatus !== null){
        message.inreply(new MessageEmbed() .setDescription('NSFW Commands are Disabled') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    let topgg = await API
    .get(`https://top.gg/api//bots/803362044048572456/check?userId=${message.author.id}`)
    .set("Authorization", TOPGG_AUTH_TOKEN)
    let voted = topgg.body.voted>0?true:false
    if (voted === false){
        return message.inreply('You need to vote for me real quick before using NSFW commands: https://top.gg/bot/803362044048572456/vote')
    }
    API.get('https://nekos.life/api/v2/img/les')
    .then(function(res){
        message.channel.send(
            new MessageEmbed()
            .setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic: true}))
            .setImage(res.body.url)
            .setFooter(`${message.author.username} Here, take some lesbian gifs`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
    }).catch((e) => {
        console.error(e);
    })
}
}