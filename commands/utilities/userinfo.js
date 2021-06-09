const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Userinfo extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'userinfo',
    category: 'Utility',
    description: 'Shows a users info',
    aliases: ['whois'],
    usage: 'userinfo <user>',
})
}
async execute(message, client, args){
        this.globalMessage(message);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (args[0] && member === message.member) return this.respond(new Discord.MessageEmbed() .setDescription('User Not Found') .setColor(this.embedColor))
        let memberRoles = member.roles?member.roles.cache.map(r => `${r}`).join('|'):'Member has no roles'
        let joinedAt = member.joinedAt.toDateString() 
        let user = member.user
        let accountCreatedAt = user.createdAt.toDateString() 
        const userInfoEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag ,message.author.displayAvatarURL({dynamic: true}))
        .addField('User Info' ,`**Username:** ${user.username}\n\n**User Id:** ${user.id}\n\n**Discriminator:** #${user.discriminator}\n\n**Avatar:** [Link](${user.displayAvatarURL({dynamic: true})})\n\n**Account Created At:** ${accountCreatedAt}`)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setFooter('Page 1/3')
        const memberinfoEmbed = new Discord.MessageEmbed()
        .setAuthor(user.tag ,user.displayAvatarURL({dynamic: true}))
        .addField('Member Info:',`**Nickname:** ${member.nickname ? member.nickname: 'None'}\n\n**DisplayColor:** ${member.displayHexColor ? member.displayHexColor: 'None'}\n\n**Joined This Server At:** ${joinedAt}\n\n**Permissions:** ${member.permissions.toArray().length>0?member.permissions.toArray().map(p => `${p.split('').shift()}${p.slice(1).toLowerCase()}`).join('  '):'None'}\n\n**Roles:** ${memberRoles}\n\n**Highest Role:** ${member.roles?`<@&${member.roles.highest.id}>`:'None'}`)
        .setColor(member.displayHexColor ? member.displayHexColor: this.embedColor)
        .setFooter('Page 2/3')
        let activities = user.presence.activities
		let activityEmbeds =[]
		for(const activity of activities){
			const activityEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.tag}'s Activity ` ,user.displayAvatarURL({dynamic: true}))
				.setThumbnail(user.displayAvatarURL({dynamic: true}))
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
				.addField("Name", activity.name, true)
				.addField("Type", activity.type, true)
				.addField("State", activity.state?activity.state:"None", true)
				.addField("Details", activity.details?activity.details:"None", true)
                .setFooter('Page 3/3')
			activityEmbeds.push(activityEmbed)
		}
        let page = 0;
        let embeds = []
        embeds.push(userInfoEmbed)
        embeds.push(memberinfoEmbed)
        embeds = embeds.concat(activityEmbeds)
        let userinfoembed = await message.channel.send(userInfoEmbed)
        await userinfoembed.react('⬅️')
        await userinfoembed.react('➡️')
      
        let collector = userinfoembed.createReactionCollector((r, u) => u.id === message.author.id && (r.emoji.name == '⬅️' || r.emoji.name == '➡️') ,{time: 1000000})
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name == '⬅️'){
                const userReactionss = userinfoembed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reactionn of userReactionss.values()){
                    await reactionn.users.remove(user.id)
                }
                if (page == 0){
                    page = embeds.length - 1
                } else {
                    page--
                }
                await userinfoembed.edit(embeds[page])
            }
            if (reaction.emoji.name == '➡️'){
                const userReactionss = userinfoembed.reactions.cache.filter(reaction => reaction.users.cache.filter(u => u.id !== client.user.id).has(user.id));
            
                for (const reactionn of userReactionss.values()){
                    await reactionn.users.remove(user.id)
                }
                if (page == embeds.length - 1){
                    page = 0
                } else {
                    page++
                }
                await userinfoembed.edit(embeds[page])
            }
        })
    

}
}

module.exports = Userinfo;