const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Leaderboard extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'leaderboard',
    category: 'Economy',
    aliases: ['lb'],
    description: 'Shows your guild\'s leaderboard',
    usage: 'leaderboard',
})
}
async execute(message, client, args){
    const { all } = client.db;
    let leaderBoard = all().filter(data => data.ID.startsWith(`bank_${message.guild.id}`)).sort((a, b) => b.data - a.data)
    leaderBoard.length = 10;
    let content = '';
    for (let i in leaderBoard){
        content += `**${leaderBoard.indexOf(leaderBoard[i])+1}.**  <@${leaderBoard[i].ID.slice(24)}> - **💸$${leaderBoard[i].data}**\n\n`
        } 
    message.channel.send(
        new MessageEmbed()
        .setTitle('Leaderboard')
        .setDescription(content)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setFooter('This shows each user\'s balance, not wallet')
    )
    
}
}

module.exports = Leaderboard;