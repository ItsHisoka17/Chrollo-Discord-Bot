const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');
const { realTime } = require('../../utils/utils')

class Cooldowns extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'cooldowns',
    category: 'Economy',
    aliases: ['cd'],
    description: 'Shows your current cooldowns',
    usage: 'cooldowns',
})
}
async execute(message, client, args){
    let db = client.db;
    let beg = await db.fetch(`beg_${message.guild.id}_${message.author.id}`)!==null?db.fetch(`beg_${message.guild.id}_${message.author.id}`):'Ready'
    let daily = await db.fetch(`daily_${message.guild.id}_${message.author.id}`)!==null?db.fetch(`daily_${message.guild.id}_${message.author.id}`):'Ready'
    let work = await db.fetch(`work_${message.guild.id}_${message.author.id}`)!==null?db.fetch(`work_${message.guild.id}_${message.author.id}`):'Ready'
    let gamble = await db.fetch(`gamble_${message.guild.id}_${message.author.id}`)!==null?db.fetch(`gamble_${message.guild.id}_${message.author.id}`):'Ready'
    let coinflip = await db.fetch(`coinflip_${message.guild.id}_${message.author.id}`)!==null?db.fetch(`coinflip_${message.guild.id}_${message.author.id}`):'Ready'
    let hack = await db.fetch(`hack_${message.guild.id}_${message.author.id}`)!==null?db.fetch(`hack_${message.guild.id}_${message.author.id}`):'Ready'
    let rob = await db.fetch(`rob_${message.guild.id}_${message.author.id}`)!==null?db.fetch(`rob_${message.guild.id}_${message.author.id}`):'Ready'
    let bankrob = await db.fetch(`bankrob_${message.guild.id}_${message.author.id}`)!==null?db.fetch(`bankrob_${message.guild.id}_${message.author.id}`):'Ready'
    let explore = await db.fetch(`search_${message.guild.id}_${message.author.id}`)
    let guess = await db.fetch(`guess_${message.guild.id}_${message.author.id}`)
    let code = await db.fetch(`code_${message.guild.id}_${message.author.id}`)
    let embed = new MessageEmbed()
    .setTitle('Your Cooldowns')
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
    .addFields(
        {
            name: `${getEmote(25000, beg)}Beg`, value: `${beg!=='Ready'&&25000-(Date.now() - beg)>0?`${realTime(25000-(Date.now() - beg)).seconds} Seconds`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(25000, work)}Work`, value: `${work!=='Ready'&&25000-(Date.now() - work)>0?`${realTime(25000-(Date.now() - work)).seconds} Seconds`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(43200000, daily)}Daily`, value: `${daily!=='Ready'&&43200000-(Date.now() - daily)>0?`${realTime(43200000-(Date.now() - daily)).hours} Hours and ${realTime(43200000-(Date.now() - daily)).minutes} Minutes`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(30000, gamble)}Gamble`, value: `${gamble!=='Ready'&&30000-(Date.now() - gamble)>0?`${realTime(30000-(Date.now() - gamble)).seconds} Seconds`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(60000, coinflip)}CoinFlip`, value: `${coinflip!=='Ready'&&60000-(Date.now() - coinflip)>0?`${realTime(60000-(Date.now() - coinflip)).seconds} Seconds`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(45000, hack)}Hack`, value: `${hack!=='Ready'&&45000-(Date.now() - hack)>0?`${realTime(45000-(Date.now() - hack)).minutes} Minutes`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(18000000, rob)}Rob`, value: `${rob!=='Ready'&&18000000-(Date.now() - rob)>0?`${realTime(18000000-(Date.now() - rob)).hours} Hours and ${realTime(18000000-(Date.now() - rob)).minutes} Minutes`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(18000000, bankrob)}Bankrob`, value: `${bankrob!=='Ready'&&18000000-(Date.now() - bankrob)>0?`${realTime(18000000-(Date.now() - bankrob)).hours} Hours and ${realTime(18000000-(Date.now() - bankrob)).minutes} Minutes`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(30000, explore)}Explore`, value: `${explore!=='Ready'&&30000-(Date.now() - explore)>0?`${realTime(30000-(Date.now() - explore)).seconds} Seconds`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(30000, guess)}Guess`, value:  `${guess!=='Ready'&&30000-(Date.now() - guess)>0?`${realTime(30000-(Date.now() - guess)).seconds} Seconds`:'Ready to go!'}`, inline: true
        },
        {
            name: `${getEmote(60000, code)}Code`, value:  `${code!=='Ready'&&60000-(Date.now() - code)>0?`${realTime(60000-(Date.now() - code)).seconds} Seconds`:'Ready to go!'}`, inline: true
        }
    )
    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']));
    message.channel.send(embed)
    function getEmote(time, command){
        let emote = client.emojis.cache.get('833113361637703741')
        let emote1 = client.emojis.cache.get('833125616500736070')
        return command!=='Ready'&&time-(Date.now() - command)>0?emote:emote1
    }
}
}

module.exports = Cooldowns;