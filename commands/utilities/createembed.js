const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand');

class Createembed extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'createembed',
    category: 'Utility',
    aliases: ['makeembed', 'embedder'],
    description: 'Creates an embed',
    usage: 'createembed',
})
}
async execute(message, client, args){
    this.globalMessage(message);
    if (!this.checkBotPerms('MANAGE_MESSAGES', 'channel')) return this.respond(new MessageEmbed() .setDescription('I need the Manage Messages Permission for this command') .setColor(this.embedColor))
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed() .setDescription(`**${message.author.username}** You need the Manage Messsages Permission to create embeds`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let embed = new MessageEmbed();
    message.channel.send(new MessageEmbed() .setDescription('What would you like the title to be?') .setFooter('Chrollo Embed Maker') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
    let filter = (m, u) => m.author.id === message.author.id && u.id != client.user.id
    let collector = message.channel.createMessageCollector(filter, {max:1})
    collector.on('collect', (m) => {
        embed.setTitle(m.content.substring(0,200))
        message.channel.send(new MessageEmbed() .setDescription('What would you like the Description to be?') .setFooter('Chrollo Embed Maker') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        let collector2 = message.channel.createMessageCollector(filter, {max:1})
        collector2.on('collect', (m) => {
            embed.setDescription(m.content.split('').length>2048?`${m.content.substring(0, 2048)}...`:m.content); 
            message.channel.send(new MessageEmbed() .setDescription('What would you like the Color to be?') .setFooter('Chrollo Embed Maker') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            let collector3 = message.channel.createMessageCollector(filter, {max:1})
            collector3.on('collect', async(m) => {
                embed.setColor(m.content.toUpperCase())
                embed.setFooter('Chrollo Embed Maker');
                message.channel.send(new MessageEmbed() .setDescription('What do you want the thumbnail to be? type `none` for no thumbnail') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                let collector4 = message.channel.createMessageCollector(filter, {max:1})
                collector4.on('collect', async (m) => {
                    m.content.match(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/)?embed.setThumbnail(m.content):embed.setThumbnail(null);
                    message.channel.send(new MessageEmbed() .setDescription('What do you want the footer to be? type `none` for default') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                    let collector5 = message.channel.createMessageCollector(filter,{max:1})
                    collector5.on('collect', async (m) => {
                        if (m.content === 'none'){
                            embed.setFooter('')
                        } else {
                        embed.setFooter(`${m.content.split('').length>50?m.content.substring(0,50):m.content}`)
                        }
                    message.channel.send(new MessageEmbed() .setDescription('What would you like the image to be? Type `none` for no image') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
                    message.channel.createMessageCollector(filter, {max: 1})
                    .on('collect', async function(m) {
                        if (m.content.toLowerCase() === 'none') embed.setImage(null)
                        embed.setImage(m.content.match(/https?:\/\/.*\.(?:png|jpg|gif|webp)/)?m.content:null)
                    await message.channel.bulkDelete(13)
                    message.channel.send(new MessageEmbed() .setDescription('Creating your Embed...') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])) .setFooter('Chrollo Embed Maker')).then(async finalEm => {
                setTimeout(async () => {
                await finalEm.edit(embed)
            },4000)
            })
        })
    })
               })
            })
        })
    })
}
}

module.exports = Createembed;