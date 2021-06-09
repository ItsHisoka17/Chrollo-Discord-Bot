const { MessageEmbed }= require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const { getRandomInt, realTime } = require('../../utils/utils')

class Beg extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'beg',
    category: 'Economy',
    description: 'Begs For money',
    usage: 'beg',
})
}
async execute(message, client, args) {
    let db = client.db;
    let timeout = 25000;
    let beg = await db.fetch(`beg_${message.guild.id}_${message.author.id}`)
    let time = realTime(timeout - (Date.now() - beg));
    if (beg !== null && timeout - (Date.now() - beg) > 0) {
        const noEmbed = new MessageEmbed() .setDescription(`Don't push it! You can beg again in **${time.seconds} Seconds**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(noEmbed)

        return;
      }  
    let moneyadded = getRandomInt(70, 300)
    db.add(`balance_${message.guild.id}_${message.author.id}` ,moneyadded)
    const moneyaddedembed = new MessageEmbed() .setDescription(`💸You got **$${moneyadded}** from begging`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(moneyaddedembed)
    db.set(`beg_${message.guild.id}_${message.author.id}` ,Date.now())
}
}

module.exports = Beg;