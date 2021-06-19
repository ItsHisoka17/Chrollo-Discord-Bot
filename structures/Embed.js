const { MessageEmbed } = require('discord.js');

class Embed extends MessageEmbed {
    /**
     * 
     * @param {MessageEmbed | import('discord.js').MessageEmbedOptions} data
     * @returns {MessageEmbed} 
     */
    constructor(data){
        super(data)
        if (data instanceof MessageEmbed) return data;
        this.setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4']))
    }
}

module.exports = Embed;