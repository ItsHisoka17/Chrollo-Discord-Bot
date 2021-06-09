const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

module.exports = class Queue extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'queue',
    category: 'Music',
    aliases: ['q'],
    description: 'Shows the queue for a server',
    usage: 'queue',
})
}
async execute(message, client, args){
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed() .setDescription('There are no songs currently playing') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
    const queueEmbed = new Discord.MessageEmbed()
    .setTitle('Queue')
    .setDescription(`**Currently Playing: ${queue.playing.title}**`)
    .addField('Current Songs:' ,`${queue.tracks.map((track, i) => {
        return `**${i + 1}**. ${track.title}\nRequested By: ${track.requestedBy} - Duration: ${track.duration}`
    }).slice(0, 7).join('\n\n')}`)
    .setFooter(`${queue.tracks.length > 7 ? 'Page 1/2': 'Page 1/1'} | Queue Loop: ${queue.loopMode?client.emotes.check:client.emotes.x} | Song Loop: ${queue.repeatMode?client.emotes.check:client.emotes.x}`)
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    let embed = await message.channel.send(queueEmbed)
    
    if (queue.tracks.length > 7){
    await embed.react('⬅️')
    await embed.react('➡️')
        let collecter = await embed.createReactionCollector((r, u) => u.id !== client.user.id && r.emoji.name == '⬅️' || r.emoji.name == '➡️' ,{time: 700000})
        collecter.on('collect', async (reacted, user) => {
            if (reacted.emoji.name == '⬅️'){
                const userReactionss = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reactionn of userReactionss.values()){
                    await reactionn.users.remove(user.id)
                }
                embed.edit(
                     new Discord.MessageEmbed()
                    .setTitle('Queue')
                    .setDescription(`**Currently Playing: ${queue.playing.title}**`)
                    .addField('Current Songs:' ,`${queue.tracks.map((track, i) => {
                    return `**${i + 1}**. ${track.title}\nRequested By: ${track.requestedBy} - Duration: ${track.duration}`
                    }).slice(0, 7).join('\n\n')}`)
                   .setFooter(`${queue.tracks.length > 7 ? 'Page 1/2': 'Page 1/1'} | Queue Loop: ${queue.loopMode?client.emotes.check:client.emotes.x} | Song Loop: ${queue.repeatMode?client.emotes.check:client.emotes.x}`)
                   .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                )
            }
            if (reacted.emoji.name == '➡️'){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                embed.edit(new Discord.MessageEmbed()
                    .setTitle('Queue')
                    .setDescription(`**Currently Playing: ${queue.playing.title}**`)
                    .addField('Current Songs:' ,`${queue.tracks.map((track, i) => {
                        return `**${i + 1}**. ${track.title}\nRequested By: ${track.requestedBy} - Duration: ${track.duration}`
                    }).slice(7, 14).join('\n\n')}`)
                    .setFooter(`'Page 2/2' ${queue.repeatMode ? '(Looped)': ''}`)
                    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                )
            
            }
        })
            if (args[0] === '2'){
                embed.edit(
                    new Discord.MessageEmbed()
                    .setTitle('Queue')
                    .setDescription(`**Currently Playing: ${queue.playing.title}`)
                    .addField('Current Songs:' ,`${queue.tracks.map((track, i) => {
                        return `**${i + 1}**. ${track.title}\nRequested By: ${track.requestedBy} - Duration: ${track.duration}`
                    }).slice(7, 14).join('\n\n')}`)
                    .setFooter(`'Page 2/2' ${queue.repeatMode ? '(Looped)': ''}`)
                    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                )
            }
    }
}
}