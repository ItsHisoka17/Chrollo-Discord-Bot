const Discord = require('discord.js');
const RandomFact = require('discordjs-facts');
const BaseCommand = require('../../structures/BaseCommand');

const fact = new RandomFact({
    title: 'Fun Fact', 
    color: 'RANDOM', 
    lang: 'en',  
    subject: "random",
    embed: true,
    footer: 'Fun Fact'
  });
class Fact extends BaseCommand {
  constructor(client){
  super(client, {
  name: 'funfact',
  category: 'Fun',
  description: 'Sends a random fact',
  aliases: ['fact'],
  usage: 'funfact <category>',
})
}
async execute(message, client, args) {
      if (!args[0]){
          fact.newFact(message)
          return;
      }
      if (args[0]){
        try{
        const dogfact = new RandomFact({
            title: 'Fun fact',
            color: 'RANDOM',
            lang: 'en',
            subject: args[0],
            embed: true,
            footer: 'Fun Fact'
        })
       dogfact.newFact(message)
    }catch {
        message.channel.send(new Discord.MessageEmbed() .setDescription(`Sorry, but \`${args[0]}\` Is not in my subjects list\n Try Using One of the following: \`cats\`, \`dogs\`, \`covid\`, \`emoji\`, \`space\`, \`computer\`.\nOr leave Empty For random`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
      }
  }
  }

module.exports = Fact;