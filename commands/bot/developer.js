const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const ms = require('parse-ms')

class Developer extends Command{
    constructor(client){
    super(client, {
    name: 'developer',
    category: 'Bot',
    description: 'Sends a message to my developer',
    usage: 'developer <message>',
})
}
async execute(message, client, args){
    let db = client.db;
    let req = await db.fetch(`lastreq_${message.author.id}`)
    const channel = await client.channels.cache.get('809531593747988491')
    const logsChannel = await client.channels.cache.get('809534474587996240')
    let timeout = 259200000;
    let time = ms(timeout - (Date.now() - req));
    if (req !== null && timeout - (Date.now() - req) > 0) return message.channel.send(new MessageEmbed() .setDescription(`You can send another message to the developer in ${time.days} Days, ${time.hours} Hours, And ${time.minutes} Minutes`))
    if (!args.length) return message.channel.send(new MessageEmbed() .setDescription('Please provide your message') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    message.channel.send('Message Succesfully sent to developer')
    .then(m => {
        setTimeout(() => {
            m.delete()
            message.delete()
        }, 4000);
    })
    let i;
    let report = args.join(" ")
    for(i = 0; i < report.length; i += 2000){
        const request = report.substring(i, Math.min(report.length, i+ 2000))
    let reqEmbed = await channel.send(new MessageEmbed() .setDescription(`**Message:**\n${args.join(" ")}\n**Guild:** ${message.guild.name}`) .setColor(message.member.displayHexColor ? message.member.displayHexColor: 'BLUE') .setAuthor(`New Message From ${message.author.tag} - ${message.author.id}` ,message.author.displayAvatarURL({dynamic: true})))
    await reqEmbed.react('✔️')
    await reqEmbed.react('❌')
    let collector = await reqEmbed.createReactionCollector((r, u) => u.id !== client.user.id && r.emoji.name == '✔️' || r.emoji.name == '❌' ,{max: 1})
    collector.on('collect', reaction => {
        if (reaction.emoji.name == '✔️'){
            reqEmbed.delete()
            logsChannel.send(new MessageEmbed() .setDescription(request) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setAuthor(`Message From ${message.author.tag} - ${message.author.id}` ,message.author.displayAvatarURL({dynamic: true})) .setTitle('Accepted'))
        }
        if (reaction.emoji.name == '❌'){
            reqEmbed.delete()
            logsChannel.send(new MessageEmbed() .setDescription(request) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setAuthor(`Message From ${message.author.tag} - ${message.author.id}` ,message.author.displayAvatarURL({dynamic: true})) .setTitle('Denied'))
        }
    })
    db.set(`lastreq_${message.author.id}` ,Date.now())
}
}
}

module.exports = Developer;