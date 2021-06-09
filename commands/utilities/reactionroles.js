const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const { sendHttpRequest } = require('../../utils/utils')

class ReactionRoles extends Command {
    constructor(client){
    super(client, {
        name: 'reactionroles',
        category: 'Utility',
        description: 'Sets up a reaction role for the server',
        aliases: ['rr'],
        usage: 'reactionroles <add | remove | display>'
    })
    }
async execute(message, client, args){
    this.globalMessage(message);
    let mainEmbed = new MessageEmbed() .setTitle('Reaction Roles') .setDescription('**How to use:**\n\n`reactionroles add` Creates a Reaction Role\n`reactionroles remove [role]` Removes a Reaction Role\n`reactionroles display` Displays the Reaction Roles in this server') .setColor(this.embedColor)
    if (!this.checkPerms(message.member, 'MANAGE_GUILD')) return this.respond(new MessageEmbed() .setDescription('Missing Permissions: Manage Server') .setColor(this.embedColor)).then(m => {if (m) m.delete({timeout: 5000})})
    if (!this.checkBotPerms('MANAGE_ROLES', 'guild')) return this.respond(new MessageEmbed() .setDescription('I need the Manage Roles Permission') .setColor(this.embedColor))
    if (!args[0]) return this.inlineReply(mainEmbed);
    if (args[0].toLowerCase() === 'display'){
        let reactionrolesMapped = Array.isArray(client.db.get(`reactionroles_${this.message.guild.id}`))&&client.db.get(`reactionroles_${this.message.guild.id}`).length>0?client.db.get(`reactionroles_${this.message.guild.id}`).map((r) => `<@&${r.role.id}> | <#${r.channel.id}>`).join('\n'):'You have no Reaction Roles setup for this server';
        this.inlineReply(new MessageEmbed() .setAuthor('Reaction Roles', this.client.user.displayAvatarURL()) .setDescription(`**Reaction Roles for this server:**\n\n${reactionrolesMapped}`) .setColor(this.embedColor))
        return;
    }
    if (args[0].toLowerCase() === 'add'){
    let request = await sendHttpRequest(`https://top.gg/api//bots/803362044048572456/check?userId=${this.message.author.id}`, {headers: {"Authorization": client.config.TOPGG_AUTH_TOKEN}})
    let body = request.voted>0?true:false
    if (!body) return this.inlineReply('You need to vote for me on Top.gg before using reaction roles: https://top.gg/bot/803362044048572456/vote')
    if (Array.isArray(this.client.db.get(`reactionroles_${this.message.guild.id}`) && this.client.db.get(`reactionroles_${this.message.guild.id}`).length >= 5)) return this.respond(new MessageEmbed() .setDescription('You\'ve reached a maximum of 5 reaction roles. Type `reactionroles remove <role>` to remove one') .setColor(this.embedColor))
    this.inlineReply(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription('Hey there! What channel would you like reaction roles to be setup in?') .setColor(this.embedColor))
    this.message.channel.createMessageCollector((m) => m.author.id === message.author.id, {max: 1, time: 60000})
    .on('collect', async (m) => {
        let channel = m.mentions.channels.first() || this.message.guild.channels.cache.get(m.content);
        if (!channel) return this.respond(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription('Invalid Channel, try the command again') .setColor(this.embedColor))
        this.respond(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription(`Channel set to <#${channel.id}>\nWhat role would you like reaction roles for?`) .setColor(this.embedColor))
        this.message.channel.createMessageCollector((m) => m.author.id === message.author.id, {max: 1, time: 60000})
        .on('collect', async (m) => {
            let role = m.mentions.roles.first() || this.message.guild.roles.cache.get(m.content);
            if (!role || role.position >= this.message.guild.me.roles.highest.position) return this.respond(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription('Invalid Role, try the command again') .setColor(this.embedColor))
            if (Array.isArray(client.db.get(`reactionroles_${this.message.guild.id}`) && client.db.get(`reactionroles_${this.message.guild.id}`).find(r => r.role.id === role.id))) return this.respond(new MessageEmbed() .setDescription('You already have reaction roles setup for that role') .setColor(this.embedColor))
            this.respond(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription(`Role set to <@&${role.id}>\nWhat would you like the role description to be? | To use the emoji: {emoji}\nExample: \`React with {emoji} to get this role\``) .setColor(this.embedColor))
            this.message.channel.createMessageCollector((m) => m.author.id === message.author.id, {max: 1, time: 600000})
            .on('collect', async (m) => {
                let descripiton = m.content.length>50?m.content.substring(0, 1024):m.content;
                let embed = await this.respond(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription(`Description set\nReact with the emoji you'd like for the reaction roles`) .setColor(this.embedColor))
                embed.createReactionCollector((r, u) => r.message.id === embed.id && u.id === message.author.id, {max: 1, time: 60000})
                .on('collect', async (r) => {
                    let emoji = r.emoji
                    this.respond(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription('What would you like the embed title to be?') .setColor(this.embedColor))
                    this.message.channel.createMessageCollector((m) => m.author.id === message.author.id, {max: 1, time: 60000})
                    .on('collect', async (m) => {
                    let title = m.content.substring(0, 20)
                    this.respond(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription('Title Set\nWhat would you like the embed colour to be? Or type `default`') .setColor(this.embedColor))
                    this.message.channel.createMessageCollector((m) => m.author.id === message.author.id, {max: 1, time: 60000})
                    .on('collect', async (m) => {
                        let color = m.content.toLowerCase()!=='default'?m.content.startsWith('#')?m.content.toLowerCase():m.content.toUpperCase():this.embedColor;
                    if (descripiton.toLowerCase().includes('{emoji}')) descripiton = descripiton.replace(/{emoji}/, emoji)
                    this.respond(new MessageEmbed() .setAuthor(`${this.client.user.username} Reaction Roles`, this.client.user.displayAvatarURL()) .setDescription(`Succesfuly setup reaction roles:\n\nChannel: <#${channel.id}>\nRole: <@&${role.id}>\nEmoji: ${emoji}\nTitle: ${title}\nDescription: ${descripiton}`) .setColor(color)).then(e => e.react(emoji)).catch((e) => {
                        this.respond(new MessageEmbed() .setDescription(`${client.emotes.x}An error occured: Invalid Emoji, Try the command again`) .setColor(this.embedColor))
                        return;
                    })
                    let embed1 = await channel.send(new MessageEmbed() .setTitle(title) .setDescription(descripiton) .setColor(color))
                    await embed1.react(emoji).catch(() => {embed1.edit(new MessageEmbed() .setDescription(`${client.emotes.x}An error occured: Invalid Emoji, Try the command again`) .setColor(this.embedColor))})
                    this.client.db.push(`reactionroles_${this.message.guild.id}`, {id: embed1.id, emoji: emoji, role: role, channel: channel})
                    })
                   })
                })
            })
        })

    })
}
    if (args[0].toLowerCase() === 'remove'){
        if (!args[1]) return this.inlineReply(mainEmbed)
        let role = this.message.mentions.roles.first() || this.message.guild.roles.cache.find(r => r.id === args[1]);
        if (!role) return this.inlineReply(mainEmbed);
        let reactionRole = Array.isArray(client.db.get(`reactionroles_${this.message.guild.id}`))?client.db.get(`reactionroles_${this.message.guild.id}`).find(r => r.role.id === role.id):null
        if (!reactionRole || reactionRole === null) return this.inlineReply(new MessageEmbed() .setDescription('There is not Reaction Role setup for that role') .setColor(this.embedColor))
        client.db.set(`reactionroles_${this.message.guild.id}`, client.db.get(`reactionroles_${this.message.guild.id}`).filter(r => r.role.id !== role.id))
        this.inlineReply(new MessageEmbed() .setAuthor('Reaction Roles', this.client.user.displayAvatarURL()).setDescription(`Succesfuly Removed Reaction Roles for <@&${role.id}>`) .setColor(this.embedColor))
    }
}
}

module.exports = ReactionRoles;