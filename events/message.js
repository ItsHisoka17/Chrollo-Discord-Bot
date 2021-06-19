const Discord = require('discord.js');
const Utils = require('../utils/utils')
const defPrefix = 'mk?'
require('../structures/Message')

module.exports = {
    event: 'message',
    once: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     */
async run(client, message){
    let db = client.db;
    if (message.channel.type == 'dm') return;
    let afk = db.get(`afk_${message.guild.id}_${message.author.id}`)
    if (afk !== null) {
        if (message.author.bot) return;
        db.delete(`afkTime_${message.guild.id}_${message.author.id}`)
        db.delete(`afk_${message.guild.id}_${message.author.id}`); message.channel.send(new Discord.MessageEmbed() .setDescription(`🌙 **${message.author.username}** I have removed your AFK`) .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m => {if(m){m.delete({timeout:10000})}})
    }
    if(message.mentions.users.first()){
        let mentionAfk = db.get(`afk_${message.guild.id}_${message.mentions.users.first().id}`)
        if (mentionAfk !== null) {
            let afkTime = Date.now() - db.get(`afkTime_${message.guild.id}_${message.mentions.users.first().id}`)
            let time = Utils.realTime(afkTime)
            message.channel.send(new Discord.MessageEmbed() .setDescription(`🌙 **${message.mentions.users.first().username}** Is currently AFK: ${db.get(`afk_${message.guild.id}_${message.mentions.users.first().id}`)}`) .setFooter(`${time.hours !== 0?`${time.hours} Hour${time.hours>1?'s':''} Ago`:`${time.minutes} Minute${time.minutes>1?'s':''} Ago`}`) .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m => {
                if (m) setTimeout(() => m.delete(), 20000)
            })
        }
    }
    if (message.content === `<@!${client.user.id}>`){
        message.channel.send(new Discord.MessageEmbed() .setDescription(`Prefix for Guild \`${message.guild.id}\` is \`${db.get(`prefix_${message.guild.id}`)?db.get(`prefix_${message.guild.id}`):defPrefix}\``) .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
    let suggestionsChannel = db.get(`sch_${message.guild.id}`)
    if (suggestionsChannel !== null){
        if (message.channel.id == suggestionsChannel.id){
            if(message.author.bot) return;
        if (!message.content.includes('setsuggestionchannel') || !message.content.includes('removesuggestionchannel')){
            if (message.member.hasPermission('MANAGE_GUILD')) return;
            message.delete()
            let i;
            let content = message.content
            for (i = 0; i < content.length; i += 2000){
            let suggestion = content.substring(i, Math.min(content.length, i + 2000))
            
            message.channel.send(new Discord.MessageEmbed() .setColor('YELLOW') .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true})) .setDescription('**Suggestion:**' + `\n${suggestion}`) .setFooter('Pending Approval').setTimestamp())
            .then(s => {
                s.react('✅')
                s.react('❌')
                let reactionCollector = s.createReactionCollector((r, u) => u.id !== client.user.id && r.emoji.name == '✅' || r.emoji.name == '❌' ,{time: 5000000})
                reactionCollector.on('collect', (reaction, user) => {
                    switch(reaction.emoji.name){
                        case '✅':
                            let member = message.guild.members.cache.get(user.id)
                            if (!member.hasPermission('MANAGE_CHANNELS')) return;
                            s.edit(
                                new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
                                .setDescription('**Suggestion:**' + `\n${suggestion}`) 
                                .setFooter('✅Suggestion Accepted')
                                .setTimestamp()
                            )
                            break;
                        case '❌':
                            let memberr = message.guild.members.cache.get(user.id)
                            if (!memberr.hasPermission('MANAGE_CHANNELS')) return;
                            if (user.bot) return;
                            s.edit(
                                new Discord.MessageEmbed()
                                .setColor('RED')
                                .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
                                .setDescription('**Suggestion:**' + `\n${suggestion}`) 
                                .setFooter(`❌Suggestion Denied`)
                                .setTimestamp()
                            )
                            break;
                        }
                })
            })
            message.channel.send('Suggestion Submitted')
            .then(un12 => {
                setTimeout(() => {
                    un12.delete()
                }, 3000)
            })
        }
        }
        }
    }
    let confess = db.get(`confess_${message.guild.id}`)
    let confess1 = db.get(`confessCh_${message.guild.id}`)
    let confess2 = db.get(`confessLogs_${message.guild.id}`)
    if (confess!==null && message.channel.id == confess.id){
        if (message.author.bot) return;
        let content = message.content?Utils.shorten(message.content, {amount: 2000, method: 'loop'}):'Nothing found'
        if (confess1 === null && confess !== null) return message.guild.channels.cache.first().send('There was an error with your confession system. Type `confess remove` and then reset it with `confess setup`')
        let channel2 = message.guild.channels.cache.get(confess1.id)
        if (channel2){
            channel2.send(new Discord.MessageEmbed() .setDescription(content.replace(/^<@!?(([0-9]{17,18}))>$/gi, "")) .setAuthor('😇Anonymous Confessions', client.user.displayAvatarURL()) .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setTimestamp())
        }
        message.delete()
        message.channel.send('Confession Sent').then(async m=>{if(m)await m.delete({timeout:5000})})
        let channel3 = message.guild.channels.cache.get(confess2?.id)
        if (!channel3) return;
        channel3.send(
            new Discord.MessageEmbed()
            .setDescription(content)
            .setAuthor(`Confession by ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
            .setFooter('😇Confession logs')
            .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
    }
    let togCh = db.get(`toggleCh_${message.guild.id}`)
    let chatchannel = db.get(`chatchannel_${message.guild.id}`)
    if (chatchannel!==null && message.channel.id == chatchannel.channel.id){
        if (message.author.bot) return;
        let { sendHttpRequest } = require('../utils/utils')
        let request = await sendHttpRequest(`https://api.affiliateplus.xyz/api/chatbot?message=${message.content}&botname=Chrollo&ownername=Developer&user=1`)
        client.fetchWebhook(chatchannel.webhook.id, chatchannel.webhook.token)
        .then(async webhook => {
            if (!webhook) return;
        await webhook.send(request.message)
        })
    }
    let regex = /^<@!?(803362044048572456){1}>\s(\w+)$/gi
    let prefix = db.get(`prefix_${message.guild.id}`)?db.get(`prefix_${message.guild.id}`):defPrefix;
    if (message.content.match(regex)){
        prefix = `<@${regex.exec(message.content)[1]}>`
    } else {
        prefix = prefix;
    }
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type == 'dm') return;
    let permission = message.channel.permissionsFor(client.user)
    if (!permission.has('SEND_MESSAGES')) return;
    if (permission.has('SEND_MESSAGES') && !permission.has('EMBED_LINKS')) return message.inreply('Hey, I\'m Missing the `Embed Links` permission, please enable it to run commands').then(m => {if (m){m.delete({timeout:5000})}})
    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName))
    if (!command) return;
    if (command.ownerOnly && message.author.id !== '490535372393021469') return;
    if (command.disabled && message.author.id !== '490535372393021469') return;
    if (togCh!==null){
        if (message.channel.id == togCh.id){
            if (!commandName.includes('togglechannel') && !message.member.hasPermission('MANAGE_GUILD')){
            message.channel.send(new Discord.MessageEmbed() .setDescription(':x: Sorry, this command is locked for this channel') .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m => {if(m)m.delete({timeout:10000})})
            return;}}}
    if (Array.isArray(client.db.get(`disabledcommands,${message.guild.id}`))) {
        if (client.db.get(`disabledcommands,${message.guild.id}`).includes(command.name)){
            return message.channel.send(new Discord.MessageEmbed() .setDescription(`Sorry, but this command is disabled. ${message.member.hasPermission('MANAGE_GUILD')?`Type \`togglecommand ${command.name}\` to enable it`:`Ask an admin to type \`togglecommand ${command.name}\` to enable it`}`) .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(m => {if(m) m.delete({timeout: 5000})})
        }
    }
    try{
        command.execute(message, client, args);
        message.author.id!='490535372393021469'?console.log(`${command.name.split('').shift().toUpperCase()}${command.name.split('').slice(1).join('')} Used by ${message.author.username} in ${message.guild.name}`):client;
        client.db.add(`commandsused`, 1)
    }catch (err){
        console.error(err)
        message.inreply('An error occured while executing the command').then(m=>{if(m)m.delete({timeout:10000})})
    }
}
}