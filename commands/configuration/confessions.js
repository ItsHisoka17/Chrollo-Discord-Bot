const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class Confess extends Command {
    constructor(client){
    super(client, {
    name: 'confessions',
    category: 'Configurations',
    description: 'Sets up confession system for your guild',
    usage: 'confessions',
})
}
async execute(message, client, args){
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed() .setDescription('Missing Permissions: Manage Server') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(async function(m){if(m){await m.delete({timeout:5000})}})
    let opt = args[0]
    let db = client.db;
    if (!opt){
        if (client.db.get(`confess_${message.guild.id}`)===null) return message.channel.send(new MessageEmbed() .setDescription('You have not yet setup a confession system for your guild. Do so by running `confessions setup`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return message.channel.send(
            new 
            MessageEmbed()
            .setDescription(`**Confession System for ${message.guild.name}**\n\nChannel to type confessions: <#${db.get(`confess_${message.guild.id}`).id}>\n\nChannel where confessions will be shown: <#${db.get(`confessCh_${message.guild.id}`).id}>`)
            .setAuthor(message.guild.name, message.guild.iconURL(true))
            .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        )
    }
    if (opt==='setup'){
        if (client.db.get(`confess_${message.guild.id}`)!==null) return message.channel.send(new MessageEmbed() .setDescription('You already have a confession system for your guild. Run `confessions remove` to remove it') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        
        let filter = (m, u) => !m.author.bot && u.id!=client.user.id;
        message.channel.send(new MessageEmbed() .setDescription('😇Please put the channel ID for where you want people to type confessions') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let collector = message.channel.createMessageCollector(filter,{max:1})
        collector.on('collect', async function(m){
            let channel = await message.guild.channels.cache.get(m.content) || m.mentions.channels.first()
            if (!channel || channel && channel.type != 'text') return message.channel.send(new MessageEmbed() .setDescription('Invalid channel, Try the command again with') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
           client.db.set(`confess_${message.guild.id}`, channel)
            message.channel.send(new MessageEmbed() .setDescription('😇Please put the channel ID for where you want confessions to be shown') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            let collector1 = message.channel.createMessageCollector(filter, {max:1})
            collector1.on('collect', async (m) => {
                let channel1 = await message.guild.channels.cache.get(m.content) || m.mentions.channels.first()
                if (!channel1 || channel1 && channel1.type != 'text') return message.channel.send(new MessageEmbed() .setDescription('Invalid channel, Try the command again') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
               client.db.set(`confessCh_${message.guild.id}`,channel1)
                message.channel.send(new MessageEmbed() .setDescription('😇Please put the channel ID for where you want Cofessions to be logged') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                let collector2 = message.channel.createMessageCollector(filter, {max:1})
                collector2.on('collect', async (m) => {
                    let channel2 = await message.guild.channels.cache.get(m.content) || m.mentions.channels.first()
                if (!channel2 || channel2 && channel2.type != 'text') return message.channel.send(new MessageEmbed() .setDescription('Invalid channel, Try the command again') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
               client.db.set(`confessLogs_${message.guild.id}`,channel2)
                message.channel.send(new MessageEmbed() .setDescription('😇Succefully setup Confessions System for your guild') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                channel.send(new MessageEmbed() .setDescription('Feeling guilty? Type your confession here\nAll confessions will be Anonymous so you don\'t have to worry about a thing!') .setAuthor('😇Anonymous Confessions', client.user.displayAvatarURL()) .setTitle('Confessions') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            })
            })
        })
    }
    if (opt==='remove'){
        let filter = (m, u) => !m.author.bot && u.id!=client.user.id;
        message.channel.send(new MessageEmbed() .setDescription('🥺Are you sure you wanna delete confession system for you guild? `y/n`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let collector = message.channel.createMessageCollector(filter,{max:1})
        collector.on('collect', (m) => {
            switch(m.content){
                case 'y':
                   client.db.delete(`confess_${message.guild.id}`)
                    client.db.delete(`confessCh_${message.guild.id}`)
                    message.channel.send(new MessageEmbed() .setDescription('🥺Confession system successfuly removed from your guild') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                    break;
                case 'n':
                    message.channel.send(new MessageEmbed() .setDescription('😇Aborted') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            }
        })
    }
}
}

module.exports = Confess;