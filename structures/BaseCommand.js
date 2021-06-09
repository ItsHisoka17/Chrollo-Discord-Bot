const Embedder = require('../utils/multiEmbed')

class BaseCommand {
    constructor(client, options = {}){
        this.client = client;
        this.name = options.name;
        this.category = options.category;
        this.aliases = options.aliases?options.aliases:[];
        this.description = options.description;
        this.usage = options.usage;
        this.disabled = options.disabled?options.disabled:false;
        this.ownerOnly = options.ownerOnly?options.ownerOnly:false;
    }
    set setM(message){
        this.message = message;
    }
    globalMessage(message){
        this.message = message;
    }
    respond(message){
        return this.message.channel.send(message)
    }
    inlineReply(content){
        require('./inreply')
        return this.message.inreply(content)
    }
    get embedColor(){
        return require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])
    }
    execute(){
        throw new Error(`Execute function for ${this.name} not found`)
    }
    paginateEmbeds(embeds, time){
        if (!Array.isArray(embeds)) throw new TypeError(`EMBEDS Must be of Type ARRAY`)
        let embed = new Embedder(embeds, time, this.message)
        return embed.startMultiEmbeds()
    }
    checkPerms(member, perm){
        if (member.hasPermission(perm)){
            return true;
        } else {
            return false;
        }
    }
    checkBotPerms(perm, type = 'channel'){
        if (type === 'channel'){
            if (this.message.channel.permissionsFor(this.client.user).has(perm)){
                return true;
            } else {
                return false;
            } 
        } else {
            if (type === 'guild'){
                if (this.message.guild.me.hasPermission(perm)){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    /**
     * 
     * @param {string} text 
     */
    parseMention(text){
        let match = /^<@!?(([0-9]{17,18}))>$/gi.exec(text)
        let res = match?this.client.users.cache.get(match[1]):false;
        return res;
    }
    /** 
     * @param {string} channel 
    */
   parseChannel(channel){
       let match = channel.match(/^<#(\d+)>$/)
       let result = match?this.client.channels.cache.get(match[1]):false;
       return result;
   }
   /**
    * 
    * @param {string} role 
    */
   parseRole(role){
       let match = role.match(/^<@&?(\d+)>?$/)
       return match?this.message.guilds.roles.cache.get(match[1])?this.message.guild.roles.cache.get(match[2]):false:false
   }
}

module.exports = BaseCommand;