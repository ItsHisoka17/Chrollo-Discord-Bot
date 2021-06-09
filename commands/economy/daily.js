const Discord = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const { realTime, getRandomInt } = require('../../utils/utils')
const ms = realTime

class Daily extends BaseCommand{
  constructor(client){
  super(client, {
  name: 'daily',
  category: 'Economy',
  description: 'Gives you your daily money',
  usage: 'daily',
})
}
async execute(message, client, args) {
    let db = client.db;
    let user = message.author;
    let timeout = 43200000;
    let amount = getRandomInt(980, 2000)
    let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
  
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));
      const noEmbed = new Discord.MessageEmbed() .setDescription(`Relax Dude! Lets Wait **${time.hours} Hours ${time.minutes} Minutes And ${time.seconds} Seconds** Before reusing the Daily Command`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(noEmbed)
      return;
    }  
    const addeddaily = new Discord.MessageEmbed() .setDescription(`💸**${message.author.username}** You collected your daily reward of **$${amount}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(addeddaily)
    db.add(`balance_${message.guild.id}_${user.id}` ,amount)
    db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
}
}

module.exports = Daily;