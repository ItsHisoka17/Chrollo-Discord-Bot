const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags')
const BaseCommand = require('../../structures/BaseCommand')

class welcome extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'welcome',
    category: 'Configurations',
    aliases: ['welcoming'],
    usage: 'welcome <option> (options: setup | remove)',
    description: 'Sets up, or removes welcoming for your server',
})
}
async execute(message, client, args){
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed() .setDescription('Missing Permissions: Manage Server') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(async function(m){if(m){await m.delete({timeout:5000})}})
        let welcoming = client.db.get(`welcoming_${message.guild.id}`)
        if (!args[0]){
            if (welcoming === null) return message.channel.send(new MessageEmbed() .setDescription('You have not setup welcoming for your guild. Do so by running `welcome setup`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            message.channel.send(new MessageEmbed() .setTitle(`Welcoming for ${message.guild.name}`) .setDescription(`**Welcome channel:** <#${welcoming.channel}>\n\n**Welcome message:** ${stripIndent(welcoming.message)}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            return;            
        }
        let filter = (m, u) => !m.author.bot && u.id != client.user.id;
        if (args[0].toLowerCase() === 'setup'){
            if (welcoming !== null) return message.channel.send(new MessageEmbed() .setDescription('You already have welcoming setup for your guild. Type `welcome remove` to remove it') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            message.channel.send(new MessageEmbed() .setDescription('Please mention the channel where you want welcome messages to be sent') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            let collector = message.channel.createMessageCollector(filter, {max: 1})
            collector.on('collect', function(m){
                let channel = m.mentions.channels.first() || message.guild.channels.cache.get(m.content)
                if (!channel || channel.type != 'text') return message.channel.send(new MessageEmbed() .setDescription('Invalid channel, try the command again') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                message.channel.send(new MessageEmbed() .setDescription('What would you like the welcome message to be? (Max: 600 characters) Type `none` for default') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                let collector1 = message.channel.createMessageCollector(filter, {max: 1})
                collector1.on('collect', (m) => {
                    let wmessage;
                    if (m.content === 'none') wmessage = null;
                    wmessage = m.content.split('').length > 600?`${m.content.substring(0, 600)}...`:m.content
                    client.db.set(`welcoming_${message.guild.id}`, {channel: channel.id, message: wmessage})
                    message.channel.send(new MessageEmbed() .setDescription('**Successfully setup welcoming for your guild!**') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                })
            })
        }
        if (args[0].toLowerCase() === 'remove'){
            if (welcoming === null) return message.channel.send(new MessageEmbed() .setDescription('You have not setup welcoming for your guild. Do so by running `welcome setup`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))

            message.channel.send(new MessageEmbed() .setDescription('Are you sure you wanna remove welcoming from your server? `y/n`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            let collector = message.channel.createMessageCollector(filter, {max: 1})
            collector.on('collect', (m) => {
                switch(m.content){
                    case 'y': {
                        client.db.delete(`welcoming_${message.guild.id}`)
                        message.channel.send(new MessageEmbed() .setDescription('Removed welcoming from your server') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                        break;
                    }
                    case 'n': {
                        message.channel.send(new MessageEmbed() .setDescription('Aborted') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                        break;
                    }
                }
                
            })
        }
    }
}

module.exports = welcome;