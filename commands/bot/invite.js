const Command = require('../../structures/BaseCommand')
const { MessageButton, MessageActionRow } = require('discord-buttons')

class Invite extends Command {
    constructor(client){
    super(client, {
    name: 'invite',
    category: 'Bot',
    description: 'Sends my invite',
    usage: 'invite'
})
}
async execute(message, client, args){
    let recomInv = new MessageButton()
    .setStyle('url')
    .setLabel('Recommended Perms Invite')
    .setURL('https://discord.com/oauth2/authorize?client_id=803362044048572456&permissions=36793424&scope=bot');

    let adminInv = new MessageButton()
    .setStyle('url')
    .setLabel('Recommended Perms Invite')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=803362044048572456&permissions=8&scope=bot');

    let top_gg = new MessageButton()
    .setStyle('url')
    .setLabel('Top.GG Vote')
    .setURL('https://top.gg/bot/803362044048572456/vote');

    let buttonsArr = [recomInv, adminInv, top_gg];

    let buttonsRow = new MessageActionRow()
    .addComponents([...buttonsArr]);
    
    message.channel.send('**My Invites**', {component: buttonsRow})

}
}

module.exports = Invite;