module.exports = {
    event: 'guildCreate',
async run(client, guild){
    try{
        await guild.owner.send('Hey! Thanks for Adding me to your server!\nYour Current Prefix is `mk?`\nTo see all of my commands, type `mk?help`\n\nNeed more help?\nJoin Our support server: https://discord.gg/WhnmkwgtGb')
        console.log(`New Guild: {name: ${guild.name}, member-count: ${guild.memberCount}, owner: ${guild.owner.user.username}}`)
        client.db.add(`newguilds`, 1)
    } catch {
        
    }

}
}