module.exports = {
    event: 'guildDelete',
async run(client, guild){
    client.dataBaseManager.deleteAllData(guild)
    let emoji = client.emojis.cache.get('835341953939144714')
    try{
    await guild.owner.send(`${emoji} Im Sorry to see you go | We can do better, so give my developer some feedback: https://chrollo.xyz/support`)
    console.log(`Removed from ${guild.name} | Owner Id: ${guild.owner?.user.id}`)
    }catch{
        
    }
}
}