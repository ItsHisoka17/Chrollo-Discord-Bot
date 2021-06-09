const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const { realTime, getRandom, getRandomInt } = require('../../utils/utils')

class Find extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'find',
    category: 'Economy',
    aliases: ['explore'],
    description: 'Searches places for money',
    usage: 'find',
})
}
async execute(message, client, args) {
    let db = client.db;
    let timeout = 30000;
    let lastSearched = await db.fetch(`search_${message.guild.id}_${message.author.id}`)
    let time = realTime(timeout - (Date.now() - lastSearched));
    if (lastSearched !== null && timeout - (Date.now() - lastSearched) > 0) {
        const noEmbed = new MessageEmbed() .setDescription(`Someone likes exploring... But you can search Again in **${time.seconds} Seconds!**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(noEmbed)
        return;
      }
    let places = getRandom(['coat', 'garden', 'fridge', 'bed'])
    let places1 = getRandom(['drawer', 'closet', 'purse', 'street'])
    let places2 = getRandom(['kitchen', 'underground', 'cupboard', 'office'])
    let amount = getRandomInt(95, 300)
    message.channel.send(new MessageEmbed() .setDescription(`Where do you wanna search? **${places.split('')[0].toUpperCase()}${places.split('').slice(1).join('')}**, **${places1.split('')[0].toUpperCase()}${places1.split('').slice(1).join('')}**, **${places2.split('')[0].toUpperCase()}${places2.split('').slice(1).join('')}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let filter = (m, u) => m.content.toLowerCase() === places || m.content.toLowerCase() === places1 || m.content.toLowerCase() === places2 || m.content.toLowerCase() === 'test' && m.author.id == message.author.id;
    let collector = message.channel.createMessageCollector(filter,{max:1})
    collector.on('collect', (m) => {
        switch(m.content.toLowerCase()){
            case places:
            db.add(`balance_${message.guild.id}_${message.author.id}`, amount)
            message.channel.send(new MessageEmbed() .setDescription(`You searched the **${places}** and found **💸$${amount}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            break;
            case places1:
            db.add(`balance_${message.guild.id}_${message.author.id}`, amount)
            message.channel.send(new MessageEmbed() .setDescription(`You searched the **${places1}** and found **💸$${amount}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            break;
            case places2:
            db.add(`balance_${message.guild.id}_${message.author.id}`, amount)
            message.channel.send(new MessageEmbed() .setDescription(`You searched the **${places2}** and found **💸$${amount}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            break;
            case 'test':
            break;
        }
    db.set(`search_${message.guild.id}_${message.author.id}`, Date.now())
    })  
}
}

module.exports = Find;