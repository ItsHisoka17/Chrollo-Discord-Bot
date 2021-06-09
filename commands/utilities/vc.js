const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class VC extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'vc',
    category: 'Utility',
    aliases: ['join'],
    description: 'Moves you into a user\'s voice channel',
    usage: 'vc [user]',
})
}
async execute(message, client, args){
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!mention){
        const invalArgs = new MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription('```Invalid Args: Please Mention someone```')
   message.channel.send(invalArgs).then(m => m.delete({timeout: 3000}))
   return;
    }
    if(!mention.voice.channel){
        const noVCEmbed = new MessageEmbed() .setDescription(`Sorry. ${mention.user.tag} is not in a Voice channel`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(noVCEmbed).then(m => m.delete({timeout:5000}))
    }
    let vcInvite = await mention.voice.channel.createInvite()
    if(!message.member.voice.channel){
        const joinEmbed = new MessageEmbed() .setAuthor(mention.user.tag ,mention.user.displayAvatarURL()) .setDescription(`[Click Here to Join ${mention.voice.channel.name}](${vcInvite.url})`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setFooter('This message will delete itself in 1 minute'); message.channel.send(joinEmbed).then(m => {if(m)m.delete({timeout:60000})})
        return;
    } else {
        if (!message.guild.me.hasPermission("MOVE_MEMBERS")) return;
        try{
        message.member.voice.setChannel(mention.voice.channel)
        message.channel.send(new MessageEmbed() .setDescription(`Moved **${message.author.username}** To [${mention.voice.channel.name}](${vcInvite.url})`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        } catch (err) {
            console.error(err)
            message.reply('Sorry, But i could not move you to that voice channel').then(m => m.delete({timeout: 3000}))
        }
    }
}
}

module.exports = VC;