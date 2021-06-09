const Discord = require("discord.js");
const BaseCommand = require("../../structures/BaseCommand");

class RPS extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'rps',
    category: 'Fun',
    description: "plays Rock, Paper, Scissors",
    usage: 'rps',
})
}
async execute(message, client, args) {
        let db = client.db;
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = 'mk?'
        let botChoice = ['Rock', 'Paper', 'Scissors']
        let botChoice2 = Math.floor(Math.random () * botChoice.length)
        let respone = String([botChoice[botChoice2]])
        const rps = new Discord.MessageEmbed() .setDescription('**Lets Play Rock Paper Scissors!** \n React With the corresponding emoji: \n **Rock:** 🗿 / **Paper:** 📜 / **Scissors:** ✂️') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        const rpsSent = await message.channel.send(rps)
        await rpsSent.react('🗿')
        await rpsSent.react('📜')
        await rpsSent.react('✂️')
        const filter = (reaction, user) =>  user.id === message.author.id && reaction.emoji.name == '🗿' || reaction.emoji.name == '✂️' || reaction.emoji.name == '📜'
        rpsSent.awaitReactions(filter, {max: 1, time: 20000, errors: ['time']})
        .then(collected => {
            if (collected.first().emoji.name == '🗿'){
                if (respone == 'Scissors'){
                    const youLost = new Discord.MessageEmbed() .setDescription(`You Won! I hade Scissors. \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost);
                }
                if (respone == 'Rock'){
                    const youLost2 = new Discord.MessageEmbed() .setDescription(`It Was a Tie, we both had Rock! \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost2);
                }
                if (respone == 'Paper'){
                    const youLost3 = new Discord.MessageEmbed() .setDescription(`I Won! I hade Paper!. \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost3);
                }
                rpsSent.reactions.removeAll()
            }
            if (collected.first().emoji.name == '✂️'){
                if (respone == 'Scissors'){
                    const youLost4 = new Discord.MessageEmbed() .setDescription(`It Was a Tie. We both had Scissors. \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost4);
                }
                if (respone == 'Rock'){
                    const youLost5 = new Discord.MessageEmbed() .setDescription(`I Won! I had Rock! \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost5);
                }
                if (respone == 'Paper'){
                    const youLost6 = new Discord.MessageEmbed() .setDescription(`You Won! I had Paper!. \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost6);
                }
                rpsSent.reactions.removeAll()
            }
            if (collected.first().emoji.name == '📜'){
                if (respone == 'Scissors'){
                    const youLost7 = new Discord.MessageEmbed() .setDescription(`I Won. I had Scissors \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost7);
                }
                if (respone == 'Rock'){
                    const youLost8 = new Discord.MessageEmbed() .setDescription(`You Won! I had Rock! \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost8);
                }
                if (respone == 'Paper'){
                    const youLost9 = new Discord.MessageEmbed() .setDescription(`It Was a Tie. We both had Paper. \n Type \`${prefix}rps\` to Play Again!`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])); message.channel.send(youLost9);
                }
                rpsSent.reactions.removeAll()
            }
        }).catch(() => message.channel.send(`<@${message.author.id}>` ,new Discord.MessageEmbed() .setDescription('You Ran out of Time! React with something!') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))))           
    }
}

module.exports = RPS;