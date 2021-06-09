const { MessageEmbed } = require("discord.js");

module.exports = {
    event: 'messageReactionAdd',
async run(client, reaction, user){
    let guild = reaction.message.guild;
    let member = guild.members.cache.get(user.id)
    if (!member) return;
    let reactionroles = client.db.get(`reactionroles_${guild.id}`)
    let reactionrole = Array.isArray(reactionroles)?reactionroles.find(r => r.id === reaction.message.id):false;
    if (reactionrole){
    let role = guild.roles.cache.get(reactionrole.role.id)
    if (!guild.me.hasPermission('MANAGE_ROLES') || role.position >= guild.me.roles.highest.position) return;
    if (member.roles.cache.has(role.id)) return;
    if (reaction.emoji.name === reactionrole.emoji.name){
    member.roles.add(role.id)
    try {
        user.send(`**${guild.name}:** You now have the **${role.name}** Role`)
    } catch {
        
    }
}
}
    if (reaction.emoji.name == '⭐'){
        let message = reaction.message;
        if (!message || message === null) return;
        if (!message.author || message.author === null) return;
        let starChannels = client.db.get(`starboard_${message.guild.id}`);
        if (starChannels === null || !guild.channels.cache.get(starChannels.id)) return;
        let starChannel = guild.channels.cache.get(starChannels.id)
        if (message.author.bot) return;
        if (message.author.id == user.id) return;
        let messagesFound = await starChannel.messages.fetch({limit: 100})
        let messageFound = messagesFound.array().find(m => m.embeds && m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
        if (!messageFound) {
            let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`Jump To **[Message](${message.url})**`)
            .setImage(message.attachments.size>0?message.attachments.first().url:null)
            .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            .setFooter(`⭐ 1 | ${message.id}`)
            .setTimestamp(new Date())
            if (message.content){
                embed.addField('Message', require('../utils/utils').shorten(message.content, {amount: 1024, method: 'loop'}))
            }
            guild.channels.cache.get(starChannel.id)?.send(embed)
            return;
        } else {
            if (messageFound){
            let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`**Jump To [Message](${message.url})**`)
            .setImage(message.attachments.size>0?message.attachments.first().url:null)
            .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            .setFooter(`⭐ ${parseInt(messageFound.embeds[0].footer.text.split(' ')[1])+1} | ${message.id}`)
            .setTimestamp(new Date())
            if (message.content){
                embed.addField('Message', require('../utils/utils').shorten(message.content, {amount: 1024, method: 'loop'}))
            }
            messageFound.edit(embed)
        }
    }
    }
}
}