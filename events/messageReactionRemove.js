module.exports = {
    event: 'messageReactionRemove',
async run(client, reaction, user){
    let guild = reaction.message.guild;
    let member = guild.members.cache.get(user.id)
    if (!member) return;
    let reactionroles = client.db.get(`reactionroles_${guild.id}`)
    if (!Array.isArray(reactionroles)) return;
    let reactionrole = reactionroles.find(r => r.id === reaction.message.id)
    if (!reactionrole) return;
    let role = guild.roles.cache.get(reactionrole.role.id)
    if (!member.roles.cache.has(role.id)) return;
    if (!guild.me.hasPermission('MANAGE_ROLES') || role.position >= guild.me.roles.highest.position) return;
    if (reaction.emoji.name === reactionrole.emoji.name){
    member.roles.remove(role.id)
    try {
        user.send(`**${guild.name}:** You no longer have the **${role.name}** Role`)
    } catch {
        
    }
}
}
}