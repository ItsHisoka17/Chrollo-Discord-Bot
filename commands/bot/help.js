const Discord = require('discord.js');
const Command = require('../../structures/BaseCommand')

class Help extends Command {
    constructor(client){
    super(client, {
    name: 'help',
    category: 'Bot',
    description: 'Sends Bot\'s Help page',
    usage: 'help <category | command name>',
})
}
async execute(message, client, args){
    this.globalMessage(message);
    if (!this.checkBotPerms('MANAGE_MESSAGES', 'channel')) return this.respond(new Discord.MessageEmbed() .setDescription('I need the following permissions: Manage Messages') .setColor(this.embedColor))
    let db = client.db;
    let botEmoji = client.emojis.cache.get('836266830610956338')
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = 'mk?'
    let h = args[0]?args[0].toLowerCase():args[0]
    const helpEmbed = new Discord.MessageEmbed()
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    .setAuthor(client.user.username ,client.user.displayAvatarURL())
    .setTitle('Main Help Page')
    .setDescription(`Prefix For Your Guild is \`${prefix}\`\nType \`help <command name>\` To show info about specific commands\n\n[Click Here to view all commands](https://chrollo.xyz/commands)\n\n**🎉Fun Commands:** React with 🎉\n\n**🎵Music Commands:** React with 🎵\n\n**💰Economy Commands:** React with 💰\n\n**🔞NSFW Commands:** React with 🔞\n\n**💻Utility Commands:** React with 💻\n\n**🔎Search Commands:** React with 🔎\n\n**${botEmoji}Bot Commands:** React with ${botEmoji}`)
    let funCommandsNames = client.commands.filter(c => c.category.toLowerCase() === 'fun' && !c.disabled).map(c => `\`${c.name}\``).join('\n')
    let funCommandDescriptions = client.commands.filter(c => c.category.toLowerCase() === 'fun' && !c.disabled).map(c => `*${c.description}*`).join('\n')
    let musicCommandsNames = client.commands.filter(c => c.category.toLowerCase() === 'music' && !c.disabled).map(c => `\`${c.name}\``).join('\n')
    let musicCommandDescriptions = client.commands.filter(c => c.category.toLowerCase() === 'music' && !c.disabled).map(c => `*${c.description}*`).join('\n')
    let configCommands = client.commands.filter(c => c.category.toLowerCase() === 'configurations' && !c.disabled).map(c => `**${c.name}** (*${c.description}*)`).join('\n\n')
    let econCommandsNames = client.commands.filter(c => c.category.toLowerCase() === 'economy' && !c.disabled).map(c => `\`${c.name}\``).join('\n')
    let econCommandDescriptions = client.commands.filter(c => c.category.toLowerCase() === 'economy' && !c.disabled).map(c => `*${c.description}*`).join('\n')
    let nsfwCommands = client.commands.filter(c => c.category.toLowerCase() === 'nsfw' && !c.disabled).map(c => `${c.name}`).join('\n\n')
    let utilityCommands = client.commands.filter(c => c.category.toLowerCase() === 'utility' && !c.disabled).map(c => `\`${c.name}\` - (${c.description})`).join('\n\n')
    let searchCommands = client.commands.filter(c => c.category.toLowerCase() === 'search' && !c.disabled).map(c => `**${c.name}** - (${c.description})`).join('\n\n')
    let botCommands = client.commands.filter(c => c.category.toLowerCase() === 'bot' && !c.disabled).map(c => `**${c.name}** - (${c.description})`).join('\n\n')
    if (h){
    if (h === 'fun'){
        const Fun = new Discord.MessageEmbed()
        .setDescription('🎉**Chrollo help page > Fun Commands**')
        .addField('Command Names:',funCommandsNames, true)
        .addField('Values:',funCommandDescriptions, true)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        message.channel.send(Fun)
    }
    if (h === 'music'){
        const music = new Discord.MessageEmbed()
        .setDescription('🎵**Chrollo help page > Music Commands**')
        .addField('Command Names:', musicCommandsNames, true)
        .addField('Values:', musicCommandDescriptions, true)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setFooter('[] = Mandatory | <> = Optional')
        message.channel.send(music)
    }
    if (h === 'config'){
        const Staff = new Discord.MessageEmbed()
        .setDescription('🔨**Chrollo help page > Configuration Commands**')
        .addField('These Command are only for Setting up this bot' ,configCommands)
        .setColor('GREY')
        message.channel.send(Staff)
    }
    if (h === 'economy' || h === 'econ'){
        const econEmbed = new Discord.MessageEmbed()
        .setDescription('💰**Chrollo help page > Economy Commands**')
        .addField('Command Names:', econCommandsNames, true)
        .addField('Values:', econCommandDescriptions, true)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        message.channel.send(econEmbed)
    }
    if (h === 'nsfw'){
        if (!message.channel.nsfw) return message.channel.send(new Discord.MessageEmbed() .setDescription('This Command can **Only** be used in NSFW channels') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        .then(m => { 
            setTimeout(() => {
                m.delete()
            }, 2000, )
            })
        const nsfw = new Discord.MessageEmbed()
        .setDescription(`🔞**Chrollo help page > NSFW Commands**\n\n${nsfwCommands}`)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        message.channel.send(nsfw)
    }
    if (h === 'utils'){
        message.channel.send(new Discord.MessageEmbed() .setDescription(`**💻Chrollo help page > Utility Commands:**\n\n${utilityCommands}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
    if (h === 'search'){
        const search = new Discord.MessageEmbed()
        .setDescription(`**🔎Chrollo help page > Search Commands:**\n\n${searchCommands}`)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        message.channel.send(search)
    }
    if (h === 'bot'){
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`**${botEmoji}Chrollo help page > Bot Commands**\n\n${botCommands}`)
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
    }
    let cmd = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()))
    if (cmd){
        if (cmd.ownerOnly) return message.channel.send(new Discord.MessageEmbed() .setDescription(`No command or category \`${args[0]}\` found`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`**${cmd.name.split('')[0].toUpperCase()}${cmd.name.split('').slice(1).join('')}**\n\n**Category:** ${cmd.category?cmd.category:'Uncategorized'}\n\n**Description:** ${cmd.description?cmd.description:'No Description'}\n\n**Aliases:** ${cmd.aliases&&cmd.aliases.length>0?cmd.aliases.map(a => `\`${a}\``).join(' '):'`No Aliases`'}\n\n**Usage:** \`${cmd.usage?cmd.usage:'Not found'}\``)
            .setFooter('Argument requirements: [] = Mandatory | <> = Optional')
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
    }
} else {
     const embed = await message.channel.send(helpEmbed)
     if (!embed) return;
     await embed.react('🎉')
     await embed.react('🎵')
     await embed.react('🔨')
     await embed.react('💰')
     await embed.react('🔞')
     await embed.react('💻')
     await embed.react('🔎')
     await embed.react(botEmoji)
     await embed.react('🔄')
       let collector = await embed.createReactionCollector((r, u) => u.id !== client.user.id && (r.emoji.name == '🎉' || r.emoji.name == '🎵' || r.emoji.name == '🔨' || r.emoji.name == '💰' || r.emoji.name == '💻' || r.emoji.name == '🔎' || r.emoji.name == '🔞' || r.emoji.name == botEmoji.name ||r.emoji.name == '🔄'))
       collector.on('collect', async (reaction, user) => {
           if (reaction.emoji.name == '🎉'){
            const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
            for (const reaction of userReactions.values()){
                await reaction.users.remove(user.id)
            }
               embed.edit(
                   new Discord.MessageEmbed()
                   .setDescription('🎉**Chrollo help page > Fun Commands**')
                   .addField('Command Names:',funCommandsNames, true)
                   .addField('Values:',funCommandDescriptions, true)
                   .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
               )
           }
            if (reaction.emoji.name == '🎵'){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                embed.edit(
                    new Discord.MessageEmbed()
                    .setDescription('🎵**Chrollo help page > Music Commands**')
                    .addField('Command Names:', musicCommandsNames, true)
                    .addField('Values:', musicCommandDescriptions, true)
                    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                    .setFooter('[] = Mandatory | <> = Optional')
                )
            }
            if (reaction.emoji.name == '🔨'){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                embed.edit(
                    new Discord.MessageEmbed()
                    .setDescription('🔨**Chrollo help page > Configuration Commands**')
                    .addField('These Command are only for Setting up this bot' ,configCommands)
                    .setColor('GREY')
                )
            }
            if (reaction.emoji.name == '💰'){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                embed.edit(
                new Discord.MessageEmbed()
                .setDescription('💰**Chrollo help page > Economy Commands**')
                .addField('Command Names:', econCommandsNames, true)
                .addField('Values:', econCommandDescriptions, true)
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                )
            }
            if (reaction.emoji.name == '🔞'){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                if (!message.channel.nsfw) return message.channel.send(new Discord.MessageEmbed() .setDescription('This Command can **Only** be used in NSFW channels') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                .then(m => { 
                    setTimeout(() => {
                        m.delete()
                    }, 2000, )
                    })
                embed.edit(
                    new Discord.MessageEmbed()
                    .setDescription(`🔞**Chrollo help page > NSFW Commands**\n\n${nsfwCommands}`)
                    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                )
            }
            if (reaction.emoji.name == '💻'){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                embed.edit(new Discord.MessageEmbed() .setDescription(`**💻Chrollo help page > Utility Commands:**\n\n${utilityCommands}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            }
            if (reaction.emoji.name == '🔎'){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                embed.edit(
                    new Discord.MessageEmbed()
                    .setDescription(`**🔎Chrollo help page > Search Commands:**\n\n${searchCommands}`)
                    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                )
                }
            if (reaction.emoji.name == botEmoji.name){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                embed.edit(
                    new Discord.MessageEmbed()
                    .setDescription(`**${botEmoji}Chrollo help page > Bot Commands**\n\n${botCommands}`)
                    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
                )
            }
            if (reaction.emoji.name == '🔄'){
                const userReactions = embed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reaction of userReactions.values()){
                    await reaction.users.remove(user.id)
                }
                embed.edit(helpEmbed)
            }
       })
    }
}
}

module.exports = Help;