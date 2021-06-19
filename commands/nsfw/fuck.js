const { MessageEmbed } = require('discord.js');
const fetch = require('node-superfetch')
const { TOPGG_AUTH_TOKEN } = require('../../config.json');
const BaseCommand = require('../../structures/BaseCommand');


module.exports = class Fuck extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'fuck',
    category: 'NSFW',
})
}
async execute(message, client, args){
    let db = client.db;
    let user = message.mentions.users.first() || message.author
    if (!message.channel.nsfw){
        message.channel.send(new MessageEmbed() .setDescription('This command can only be used in NSFW channels') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    let nsfwStatus = db.get(`nsfw_${message.guild.id}`)
    if (nsfwStatus !== null){
        message.channel.send(new MessageEmbed() .setDescription('NSFW Commands are Disabled') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    let topgg = await fetch
    .get(`https://top.gg/api//bots/803362044048572456/check?userId=${message.author.id}`)
    .set("Authorization", TOPGG_AUTH_TOKEN)
    let voted = topgg.body.voted>0?true:false
    if (voted === false){
        return message.channel.send('You need to vote for me real quick before using NSFW commands: https://top.gg/bot/803362044048572456/vote')
    }
    fetch.get('https://anime-api.hisoka17.repl.co/img/hentai?filter=fuck')
    .then(res => {
        message.channel.send(new MessageEmbed() .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})) .setImage(res.body.url) .setFooter(`${message.author.username} Fucks ${user.username}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    })
}
}