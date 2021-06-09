const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms')
const utils = require('../../utils/utils')
const passwords = require('../../assets/Json Files/passes.json');
const BaseCommand = require('../../structures/BaseCommand');

class Hack extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'hack',
    category: 'Economy',
    description: '~~fake~~ Hacks a user',
    usage: 'hack [user]',
})
}
async execute(message, client, args) {
    let data = client.db;
    let timeout = 45000;
    let hack = await data.fetch(`hack_${message.guild.id}_${message.author.id}`)
    let time = ms(timeout - (Date.now() - hack))
    if (hack !== null && timeout - (Date.now() - hack) > 0) return message.channel.send(new MessageEmbed() .setDescription(`🛠️Your computer is being repaired, wait **${time.seconds} Seconds**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let password = Math.floor(Math.random () * passwords.length)
    let dms = ['That never should\'ve happened...', 'I can\'t believe she rejected me so badly', 'My dong is too small dude!', 'They found it....', 'Mom, it\'s not what you think...', 'Dude wtf, im being robbed', 'No, your breaking up with me?', 'I kinda wanna ask Jessica out again', 'What? your disowning me???']
    let dm = Math.floor(Math.random () * dms.length)
    let money = utils.getRandomInt(100, 500)
    if (user){
        if (user.user.id === message.author.id || user.user.bot) return message.channel.send(new MessageEmbed() .setDescription('Aw thats sad, can\'t hack yourself or bots bud!') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let firstEmbed = await message.channel.send(new MessageEmbed() .setDescription(`Starting to hack ${user.user.username}...`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription('Breaching security protocols...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 2200);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription('Hacking their Email...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 3700);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription(`Successfully hacked email: ${user.user.username}@moron.com`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 5200);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription('Finding their password...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 6900);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription(`Password found: ${passwords[password]}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 8100);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription('Getting thier recent Dms...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 9600);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription(`Recent DMs found: ${dms[dm]}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 11100);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription(`Sold info for **$${money}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            data.add(`balance_${message.guild.id}_${message.author.id}` ,money)
        }, 12600);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription(`Reporting account for breaking TOS`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 14100);
        setTimeout(() => {
            firstEmbed.edit(new MessageEmbed() .setDescription(`Gathering All info...`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        }, 15600);
        setTimeout(() => {
            let hackedTime = ms(Date.now() - message.createdTimestamp)
           firstEmbed.edit(new MessageEmbed() .setTitle('Hack Complete') .setDescription(`${message.author.username} Hacked ${user.user.username}` ,true) .addField('Email Address:' ,`${user.user.tag}@moron.com`) .addField('Password:' ,passwords[password] ,true) .addField('Last DM:' ,dms[dm] ,false).setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .addField(`Sold info for: ` ,`**$${money}**`).addField('Hacking Complete in:' ,`${hackedTime.seconds} Seconds`) .setFooter('Just an fyi, this isn\'t real hacking'))
        }, 17100);
        data.set(`hack_${message.guild.id}_${message.author.id}` ,Date.now())
    } else {
        return message.channel.send(new MessageEmbed() .setDescription('You gotta hack someone...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    }
}
}

module.exports = Hack;