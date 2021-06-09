const { MessageEmbed } = require('discord.js');
const { token } = require('../../config.json');
const BaseCommand = require('../../structures/BaseCommand');

class Restart extends BaseCommand {
    constructor(client){
    super(client, {
    name: 'restart',
    category: 'Owner',
    ownerOnly: true,
})
}
async execute(message, client, args){
    await message.channel.send(
        new MessageEmbed()
        .setDescription(`\`\`\`js\nRestarting...\`\`\``)
        .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
        ).then(async m => {
            await client.destroy() 
            await client.login(token)
            setTimeout(function(){
            m.edit(
                new MessageEmbed()
                .setDescription(`\`\`\`js\nRestarting... Done!\`\`\``)
                .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
            )
        },4000)
        })
}
}

module.exports = Restart;