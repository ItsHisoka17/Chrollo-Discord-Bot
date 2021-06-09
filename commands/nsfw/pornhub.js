const { MessageEmbed } = require('discord.js');
const Pornsearch = require('pornsearch')
const fetch = require('node-superfetch')
const errMessages = require('../../assets/Json Files/errors.json')
const { TOPGG_AUTH_TOKEN } = require('../../config.json');
const BaseCommand = require('../../structures/BaseCommand');

module.exports = class PornHub extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'pornhub',
    category: 'NSFW',
    aliases: ['porn'],
})
}
async execute(message, client, args) {
    this.globalMessage(message)
    let db = client.db;
    if (!message.channel.nsfw){
        this.inlineReply(new MessageEmbed() .setDescription('This command can only be used in NSFW channels') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m =>{if(m){m.delete({timeout: 4000})}})
        return;
    }
    const nsfwStatus = db.get(`nsfw_${message.guild.id}`)
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
    if (!args.length) return message.channel.send(new MessageEmbed() .setDescription('You need to search for some porn you pervert!') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    try {
        let query = args.join(" ")
        let embed = await message.channel.send(new MessageEmbed() .setDescription(`Searching for your gross porn...`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let Searcher = new Pornsearch(query)
        if (!Searcher.videos()) return embed.edit(new MessageEmbed() .setDescription('0 results found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        Searcher.videos()
        .then(video => {
            if (!video[1]) return embed.edit(new MessageEmbed() .setDescription('0 results found') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            Searcher.gifs()
            .then(gif => {  
            let pEmbed = new MessageEmbed()
            .setDescription(`[${video[1].title}](${video[1].url})`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            .setAuthor(`${message.author.username} Here, take some porn` ,message.author.displayAvatarURL({dynamic: true}))
            .setImage(gif[1]?gif[1].url:null)
            embed.edit(pEmbed)
            })
        })

    } catch  (err) {
        message.channel.send(new MessageEmbed() .setDescription(errMessages.errorMessage2) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))) 
        throw err;
    }
}
}