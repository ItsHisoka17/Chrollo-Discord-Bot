const Discord = require('discord.js');
const ms = require('parse-ms');
const BaseCommand = require('../../structures/BaseCommand');

class Rob extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'rob',
    category: 'Economy',
    descripiton: 'Robs a member',
    usage: 'rob [user]',
})
}
async execute(message, client, args) {
    let db = client.db;
    var responses = ['You Succesfully Robbed', 'You got caught while trying to rob them', 'Oops, you forgot your Ski-Mask. Better luck next time']
    var randomrespone = Math.floor(Math.random () * responses.length)
    var response = String([responses[randomrespone]])
    let balance = db.get(`balance_${message.guild.id}_${message.author.id}`)
    const mention = message.mentions.members.first()
    let amountss = [500, 643, 490]
    let amounts = Math.floor(Math.random () * amountss.length)
    let amount = String([amountss[amounts]])
    let timeout = 18000000
    let rob = await db.fetch(`rob_${message.guild.id}_${message.author.id}`)
    let time = ms(timeout - (Date.now() - rob));
    if (rob !== null && timeout - (Date.now() - rob) > 0) {
        const noEmbed = new Discord.MessageEmbed() .setDescription(`Hmmm Looks like someones thirsty for Crime, But You can rob again in **${time.hours} Hours ${time.minutes} Minutes And ${time.seconds} Seconds**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(noEmbed)
        return;
      }  
    if (!mention){
        const invalArgs = new Discord.MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription('Invalid Args: Please Mention someon')
        message.channel.send(invalArgs)
        return;
    }
    let mentionbalace = db.get(`balance_${message.guild.id}_${mention.user.id}`)
    if (balance < 600){
        const notenough = new Discord.MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription(`You must have at least $600 in your balance to rob someone`); message.channel.send(notenough)
        return;
    }
    if (mentionbalace < 100){
        const less = new Discord.MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription('Come on really? They don\'t even have **$100** in their Wallet'); message.channel.send(less)
        return;
    }
   if (response === 'You got caught while trying to rob them'){
       const caughtEmbed = new Discord.MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription(`👮You were caught during the robbery and lost **$400**`); message.channel.send(caughtEmbed)
       db.subtract(`balance_${message.guild.id}_${message.author.id}` ,400)
       db.set(`rob_${message.guild.id}_${message.author.id}` ,Date.now())
       return;
   }
   if (response === 'Oops, you forgot your Ski-Mask. Better luck next time'){
       const forgotEmbed = new Discord.MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription('Oops, you forgot your Ski-Mask. Better luck next time😭'); message.channel.send(forgotEmbed)
       db.set(`rob_${message.guild.id}_${message.author.id}` ,Date.now())
       return;
    } 
   if (response === 'You Succesfully Robbed'){
       db.subtract(`balance_${message.guild.id}_${mention.user.id}` ,amount)
       db.add(`balance_${message.guild.id}_${message.author.id}` ,amount)
       const robbedEmbed = new Discord.MessageEmbed() .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setDescription(`💸You Succefully Robbed **${mention.user.username}** And got **$${amount}**`); message.channel.send(robbedEmbed)
   }
   db.set(`rob_${message.guild.id}_${message.author.id}` ,Date.now())
}
}

module.exports = Rob;