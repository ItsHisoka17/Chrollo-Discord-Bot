const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const { realTime, getRandomInt } = require('../../utils/utils')

class Work extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'work',
    category: 'Economy',
    description: 'Works to get money',
    usage: 'work',
})
}
async execute(message, client, args) {
    let db = client.db;
    let timeout = 25000;
    let work = await db.fetch(`work_${message.guild.id}_${message.author.id}`)
    let time = realTime(timeout - (Date.now() - work));
    if (work !== null && timeout - (Date.now() - work) > 0) {
        const noEmbed = new Discord.MessageEmbed() .setDescription(`Chill Dude! You can Work Again in **${time.seconds} Seconds!**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(noEmbed)
        return;
      }  
    let moneyadded = getRandomInt(79, 300)
    db.add(`balance_${message.guild.id}_${message.author.id}` ,moneyadded)
    const moneyaddedembed = new Discord.MessageEmbed() .setDescription(`💸You worked and made **$${moneyadded}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(moneyaddedembed)
    db.set(`work_${message.guild.id}_${message.author.id}` ,Date.now())
}
}

module.exports = Work;