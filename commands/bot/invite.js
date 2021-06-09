const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class Invite extends Command {
    constructor(client){
    super(client, {
    name: 'invite',
    category: 'Bot',
    description: 'Sends my invite',
    usage: 'invite',
})
}
async execute(message, client, args){
    message.channel.send(
        new MessageEmbed()
        .setAuthor(`Invite Me`, client.user.displayAvatarURL())
        .setDescription(`**[Recommended Perms Invite](https://discord.com/oauth2/authorize?client_id=803362044048572456&permissions=36793424&scope=bot "Invite with mainly needed perms")**\n\n**[Admin Perms Invite](https://discord.com/api/oauth2/authorize?client_id=803362044048572456&permissions=8&scope=bot "Invite with all permissons")**\n\n**[Top.gg Vote](https://top.gg/bot/803362044048572456/vote "Vote for me on Top.gg")**`)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    )
}
}

module.exports = Invite;