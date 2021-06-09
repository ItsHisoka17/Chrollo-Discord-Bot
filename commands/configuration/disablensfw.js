const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')

class DisableNSFW extends Command {
    constructor(client){
    super(client, {
    name: 'disablensfw',
    category: 'Configurations',
    description: 'Disables all nsfw commands for your guild',
    usage: 'disablensfw',
})
}
async execute(message, client, args) {
    if (!message.member.hasPermission('MANAGE_GUILD')){
        const embed = new MessageEmbed()
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setDescription('```Error: Missing permission: MANAGE_SERVER```')
        message.channel.send(embed)
        return;
    }
    let nsfwStatus = client.db.get(`nsfw_${message.guild.id}`)
    if (nsfwStatus !== null){
        message.channel.send(new MessageEmbed() .setDescription('NSFW Commands are Disabled') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        return;
    }
    client.db.set(`nsfw_${message.guild.id}` ,'on')
    message.channel.send(new MessageEmbed() .setDescription('All NSFW commands succefully disabled') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = DisableNSFW;