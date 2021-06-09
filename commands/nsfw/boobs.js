const { MessageEmbed } = require('discord.js');
const fetch = require('node-superfetch')
const Anime_Images = require('anime-images-api')
const { TOPGG_AUTH_TOKEN } = require('../../config.json');
const BaseCommand = require('../../structures/BaseCommand');
require('../../structures/inreply')

module.exports = class Boobs extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'boobs',
    category: 'NSFW',
})
}
async execute(message, client, args) {
    let db = client.db;
    if (!message.channel.nsfw){
        message.inreply(new MessageEmbed() .setDescription('This command can only be used in NSFW channels') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    let nsfwStatus = db.get(`nsfw_${message.guild.id}`)
    if (nsfwStatus !== null){
        message.inreply(new MessageEmbed() .setDescription('NSFW Commands are Disabled') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    let topgg = await fetch
    .get(`https://top.gg/api//bots/803362044048572456/check?userId=${message.author.id}`)
    .set("Authorization", TOPGG_AUTH_TOKEN)
    let voted = topgg.body.voted>0?true:false
    if (voted === false){
        return message.inreply('You need to vote for me real quick before using NSFW commands: https://top.gg/bot/803362044048572456/vote')
    }
    let API = new Anime_Images()
    let { image } = await API.nsfw.boobs()
    message.channel.send(new MessageEmbed() 
    .setImage(image)
    .setColor(this.embedColor)
    .setFooter(`${message.author.username} Sees some boobs` ,message.author.displayAvatarURL({dynamic: true}))
    )
}
}