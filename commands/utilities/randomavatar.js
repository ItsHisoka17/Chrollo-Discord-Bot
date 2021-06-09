const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class RandomAvatar extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'randomavatar',
    category: 'Utility',
    aliases: ['randomav'],
    description: 'Sends a random user\'s avatar',
    usage: 'randomavatar',
})
}
async execute(message, client, args) {
    let randomavatar = client.users.cache.filter(u => !u.bot).random()
    message.channel.send(new MessageEmbed() .setDescription(`**${randomavatar.tag}** [Avatar](${randomavatar.displayAvatarURL() ? randomavatar.displayAvatarURL({dynamic: true, size: 2048}): randomavatar.defaultAvatarURL})`) .setImage(randomavatar.displayAvatarURL() ? randomavatar.displayAvatarURL({dynamic: true, size: 2048}): randomavatar.defaultAvatarURL) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
}
}

module.exports = RandomAvatar;