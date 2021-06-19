const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Nowplaying extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'nowplaying',
    category: 'Music',
    aliases: ['np'],
    description: 'Shows Currently playing song',
    usage: 'nowplaying',
})
}
async execute(message, client, args) {
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in a Voice Channel to run this command') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed() .setDescription('You Need to be in the same Voice Channel as me to run this command'));
   
    if (!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed() .setDescription('There are no songs being currently played'));
    const track = client.player.nowPlaying(message);
    const embed = new Discord.MessageEmbed()
        .setDescription(`Currently Playing: [${track.title}](${track.url})\nRequested By: ${track.requestedBy}\nDuration: ${track.duration}\nVolume: ${client.player.getQueue(message).volume}\n${client.player.createProgressBar(message, { timecodes: true })}\nUpnext: [${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].title:'Nothing'}](${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].url:''})`)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setThumbnail(track.thumbnail)
        .setFooter(`Looped: ${client.player.getQueue(message).repeatMode?client.emotes.check:client.emotes.x}`)
    let embedd = await message.channel.send(embed)
    embedd.react('⏸')
    embedd.react('▶️')
    embedd.react('⏭️')
    embedd.react('🔊')
    embedd.react('🔈')
    embedd.react('🔄')
    let collector = embedd.createReactionCollector((r, u) => u.id !== client.user.id && (r.emoji.name == '⏸' || r.emoji.name == '▶️' || r.emoji.name == '⏭️' || r.emoji.name == '🔊' || r.emoji.name == '🔈' || r.emoji.name == '🔄') ,{time: 300000, errors: ['time']})
    collector.on('collect', async (reacted, user) => {
        user.id !== client.user.id;
        if (!client.player.getQueue(message)) return;
        if (reacted.emoji.name == '⏸'){
            const userReactions = embedd.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            for (const reaction of userReactions.values()){
                await reaction.users.remove(user.id)
            }
            let member = message.guild.members.cache.get(user.id) 
            if (member){
            if (!member.voice.channel) return;
            if (message.guild.me.voice.channel && member.voice.channel.id !== message.guild.me.voice.channel.id) 
            return;
            }
            client.player.pause(message)
            embedd.edit(
            new Discord.MessageEmbed()
            .setDescription(`**Paused**\nCurrently Playing: [${track.title}](${track.url})\nRequested By: ${track.requestedBy}\nDuration: ${track.duration}\nVolume: ${client.player.getQueue(message).volume}\n${client.player.createProgressBar(message, { timecodes: true })}\nLooped: ${client.player.getQueue(message).repeatMode?client.emotes.check:client.emotes.x}`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            .setThumbnail(track.thumbnail)
            .setFooter(`Looped: ${client.player.getQueue(message).repeatMode?client.emotes.check:client.emotes.x}`)
            )
        }
        if (reacted.emoji.name == '▶️'){
            const userReactionss = embedd.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
            for (const reactionn of userReactionss.values()){
                await reactionn.users.remove(user.id)
            }
            let member = message.guild.members.cache.get(user.id) 
            if (member){
            if (!member.voice.channel) return;
            if (message.guild.me.voice.channel && member.voice.channel.id !== message.guild.me.voice.channel.id) 
            return;
            }
            client.player?.resume(message)
            embedd.edit(
            new Discord.MessageEmbed()
            .setDescription(`Currently Playing: [${track.title}](${track.url})\nRequested By: ${track.requestedBy}\nDuration: ${track.duration}\nVolume: ${client.player.getQueue(message).volume}\n${client.player.createProgressBar(message, { timecodes: true })}\nUpnext: [${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].title:'Nothing'}](${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].url:''})`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
           .setThumbnail(track.thumbnail)
           .setFooter(`Looped: ${client.player.getQueue(message).repeatMode?client.emotes.check:client.emotes.x}`)
            )
        }
        if (reacted.emoji.name == '⏭️'){
            const userReactions = embedd.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            for (const reaction of userReactions.values()){
                await reaction.users.remove(user.id)
            }
            let member = message.guild.members.cache.get(user.id) 
            if (member){
            if (!member.voice.channel) return;
            if (message.guild.me.voice.channel && member.voice.channel.id !== message.guild.me.voice.channel.id) 
            return;
            }
            if (client.player.getQueue(message).tracks.length < 1) return;
            client.player?.skip(message)
            embedd.reactions.removeAll()
            embedd.edit(
                new Discord.MessageEmbed()
                .setDescription('Skipped...')
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            )
        }
        if (reacted.emoji.name == '🔊'){
            const userReactions = embedd.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            for (const reaction of userReactions.values()){
                await reaction.users.remove(user.id)
            }
            let member = message.guild.members.cache.get(user.id) 
            if (member){
            if (!member.voice.channel) return;
            if (message.guild.me.voice.channel && member.voice.channel.id !== message.guild.me.voice.channel.id) 
            return;
            }
            if (client.player.getQueue(message).volume === 150) return;
            client.player.setVolume(message, client.player.getQueue(message).volume + 10)
            embedd.edit(
                new Discord.MessageEmbed()
                .setDescription(`Currently Playing: [${track.title}](${track.url})\nRequested By: ${track.requestedBy}\nDuration: ${track.duration}\nVolume: ${client.player.getQueue(message).volume}\n${client.player.createProgressBar(message, { timecodes: true })}\nUpnext: [${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].title:'Nothing'}](${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].url:''})`)
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                .setThumbnail(track.thumbnail)
                .setFooter(`Looped: ${client.player.getQueue(message).repeatMode?client.emotes.check:client.emotes.x}`)
            )
        }
        if (reacted.emoji.name == '🔈'){
            const userReactions = embedd.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            for (const reaction of userReactions.values()){
                await reaction.users.remove(user.id)
            }
            let member = message.guild.members.cache.get(user.id) 
            if (member){
            if (!member.voice.channel) return;
            if (message.guild.me.voice.channel && member.voice.channel.id !== message.guild.me.voice.channel.id) 
            return;
            }
            if (client.player.getQueue(message).volume < 10) return;
            client.player.setVolume(message, client.player.getQueue(message).volume - 10)
            embedd.edit(
                new Discord.MessageEmbed()
                .setDescription(`Currently Playing: [${track.title}](${track.url})\nRequested By: ${track.requestedBy}\nDuration: ${track.duration}\nVolume: ${client.player.getQueue(message).volume}\n${client.player.createProgressBar(message, { timecodes: true })}\nUpnext: [${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].title:'Nothing'}](${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].url:''})`)
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                .setThumbnail(track.thumbnail)
                .setFooter(`Looped: ${client.player.getQueue(message).repeatMode?client.emotes.check:client.emotes.x}`)
            )
        }
        if (reacted.emoji.name == '🔄'){
            const userReactions = embedd.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            for (const reaction of userReactions.values()){
                await reaction.users.remove(user.id)
            }
            let member = message.guild.members.cache.get(user.id) 
            if (member){
            if (!member.voice.channel) return;
            if (message.guild.me.voice.channel && member.voice.channel.id !== message.guild.me.voice.channel.id) 
            return;
            }
            if(client.player.getQueue(message).repeatMode){
                client.player.setRepeatMode(message, false)
            } else {
                client.player.setRepeatMode(message, true)
            }
            embedd.edit(
                new Discord.MessageEmbed()
                .setDescription(`Currently Playing: [${track.title}](${track.url})\nRequested By: ${track.requestedBy}\nDuration: ${track.duration}\nVolume: ${client.player.getQueue(message).volume}\n${client.player.createProgressBar(message, { timecodes: true })}\nUpnext: [${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].title:'Nothing'}](${client.player.getQueue(message).tracks[1]?client.player.getQueue(message).tracks[1].url:''})`)
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                .setThumbnail(track.thumbnail)
                .setFooter(`Looped: ${client.player.getQueue(message).repeatMode?client.emotes.check:client.emotes.x}`)
            )
        }
    })
    collector.on('end', () => {
        if (embed) embedd.reactions.removeAll()
    })
}
}

module.exports = Nowplaying;