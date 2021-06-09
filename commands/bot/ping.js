const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const { realTime } = require('../../utils/utils')

class Ping extends Command {
    constructor(client){
    super(client, {
    name: 'ping',
    category: 'Bot',
    description: 'Shows bot and API latency',
    usage: 'ping',
})
}
async execute(message, client, args){
    const sent = await message.channel.send(new MessageEmbed() .setDescription(`**Pinging...**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let timereplied = sent.createdTimestamp - message.createdTimestamp>1000?realTime(sent.createdTimestamp - message.createdTimestamp).seconds:`0.${Math.round(sent.createdTimestamp - message.createdTimestamp)}`
    sent.edit(new MessageEmbed() .setTitle('🏓PONG!') .setDescription(`**Latency:** ${Date.now() - message.createdTimestamp}ms \n\n **API Latency:** ${client.ws.ping}ms \n\n **Replied In:** ${timereplied} Seconds`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
} 
}

module.exports = Ping;