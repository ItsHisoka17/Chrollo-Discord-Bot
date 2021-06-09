const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../structures/BaseCommand')

class Togglecommand extends BaseCommand{
    constructor(client){
    super(client, {
    name: 'togglecommand', 
    category: 'Configurations', 
    description: 'Enables/Disables a command', 
    aliases: ['toggcommand'],
    usage: 'togglecommand [command name]',
})
}
async execute(message, client, args){
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed() .setDescription('Missing Permissions: Manage Server') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))).then(async function(m){if(m){await m.delete({timeout:5000})}})
        if (!args[0]) return message.channel.send(new MessageEmbed() .setDescription('Proper Usage: `togglecommand [command name]`') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        if (args.filter(a => client.commands.get(a.toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(a.toLowerCase()))).some(c => [this.name].concat(this.aliases).includes(c))) return message.channel.send(new MessageEmbed() .setDescription('Unable to disable those commands') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        args.filter(a => client.commands.get(a.toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(a.toLowerCase())))
        .forEach(c => {
            if (!c) return message.channel.send(new MessageEmbed() .setDescription(`Couldn't find \`${c}\` command`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
            Array.isArray(client.db.get(`disabledcommands,${message.guild.id}`)) && client.db.get(`disabledcommands,${message.guild.id}`).includes(c.toLowerCase())?client.db.set(`disabledcommands,${message.guild.id}`, client.db.get(`disabledcommands,${message.guild.id}`).filter(command => command !== c)):client.db.push(`disabledcommands,${message.guild.id}`, c.toLowerCase());
        })
        message.channel.send(new MessageEmbed() .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})) .setDescription(`Toggled the following commands:\n${args.filter(a => client.commands.get(a.toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(a.toLowerCase()))).map(c => `\`${c} (${checkToggle(c, message.guild)})\``).join('\n')}`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        function checkToggle(command, guild){
            return Array.isArray(client.db.get(`disabledcommands,${guild.id}`))?client.db.get(`disabledcommands,${message.guild.id}`).includes(command.toLowerCase())?'Disabled':'Enabled':'Enabled'   
        }  
}
}

module.exports = Togglecommand;