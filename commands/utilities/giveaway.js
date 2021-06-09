const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Giveaway extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'giveaway',
    category: 'Utility',
    description: 'Starts a giveaway',
    usage: 'giveaway <time> <item>',
})
}
async execute(message, client, args){
    async function giveaway() {
        var time = '';
        var time2 = '';
        var time3 = '';
           if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed() .setDescription('Error: Missing Permissions') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
           if (!args[0]) return message.channel.send(new MessageEmbed() .setDescription('Please Provide a time!') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            const stated_duration_hours = args[0];
            const stated_duration_hours2 = stated_duration_hours.toLowerCase();
            if (stated_duration_hours2.includes('s')) {
                var time = 's';
            }
            if (stated_duration_hours2.includes('m')) {
                var time = 'm';
            }
            if (stated_duration_hours2.includes('h')) {
                var time = 'h';
            }
            if (stated_duration_hours2.includes('d')) {
                var time = 'd';
            }
            const stated_duration_hours3 = stated_duration_hours2.replace(time, '');
            if (stated_duration_hours3 === '0') {
                message.channel.send('The duration has to be atleast one.');
            }
            if (isNaN(stated_duration_hours3)) {
                message.channel.send('The duration has to be a valid time variable.');
            }
            if (stated_duration_hours3 > 1) {
                var time3 = 's';
            }
            if (time === 's') {
                var actual_duration_hours = stated_duration_hours3 * 1000;
                var time2 = 'second';
            }
            if (time === 'm') {
                var actual_duration_hours = stated_duration_hours3 * 60000;
                var time2 = 'minute';
            }
            if (time === 'h') {
                var actual_duration_hours = stated_duration_hours3 * 3600000;
                var time2 = 'hour';
            }
            if (time === 'd') {
                var actual_duration_hours = stated_duration_hours3 * 86400000;
                var time2 = 'day';
            }
            if (!isNaN(stated_duration_hours3)) {
                const prize = args.slice(1).join(' ');
                if (!prize) return message.channel.send(new MessageEmbed() .setDescription('Please provide an item to giveaway') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
                if (stated_duration_hours3 !== '0') {
                    const embed = new MessageEmbed()
                    .setTitle(`${prize}`)
                    .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))                    
                    .setDescription(`React with 🎉 to enter!\nTime duration: **${stated_duration_hours3}** ${time2}${time3}\nHosted by: ${message.author}`)
                    .setTimestamp(Date.now() + (actual_duration_hours))
                    .setFooter('Ends at')
                    let msg = await message.channel.send(embed)
                    await msg.react('🎉')

                        setTimeout(() => {
                            let winner = msg.reactions.cache.get('🎉').users.cache.filter(u => u.id !== client.user.id).random();
                            if (msg.reactions.cache.get('🎉').users.cache.filter(u => u.id !== client.user.id).size < 1) {
                                const winner_embed = new MessageEmbed()
                                .setTitle(`${prize}`)
                                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))                                
                                .setDescription(`Winner: No one entered the giveaway.\nHosted by: ${message.author}`)
                                .setTimestamp()
                                .setFooter('Ended at')
                                msg.edit(':tada: **GIVEAWAY ENDED** :tada:', winner_embed);
                                msg.reactions.removeAll()
                            }
                            if (!msg.reactions.cache.get('🎉').users.cache.filter(u => u.id !== client.user.id).size < 1) {
                                const winner_embed = new MessageEmbed()
                                .setTitle(`${prize}`)
                                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))                                
                                .setDescription(`Winner: ${winner}\nHosted by: ${message.author}`)
                                .setTimestamp()
                                .setFooter('Ended at')
                                msg.edit(':tada: **GIVEAWAY ENDED** :tada:', winner_embed);
                                message.channel.send(`:tada: Congratulations ${winner} You won the **${prize}!** :tada:`)
                            }
                    }, actual_duration_hours);
                    
                }
            }
        }

    giveaway();
}
}

module.exports = Giveaway;