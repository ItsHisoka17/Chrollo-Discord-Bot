class UtilFiles {
    static base64(text, mode = 'encode') {
          if (mode === 'encode') return Buffer.from(text).toString('base64');
          if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
          throw new TypeError(`${mode} is not a supported base64 mode.`);
      }
      
    static formatNumber(number, minimumFractionDigits = 0) {
      /**
       * @param {number} number
       * @param {number} minimumFractionDigits
       */
      return Number.parseFloat(number).toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: 2
      });
    }
      /**
      * @param {Array<String>} array - Array<Elements>
      */
    static getRandom(array){

      return array[Math.floor(Math.random() * array.length)]
    }
  
    static embedURL(title, url, display) {
          return `[${title}](${url.replace(/\)/g, '%27')}${display ? ` "${display}"` : ''})`;
    }
      /**
       * @param {number} min - Minimum Amount
       * @param {number} max - Maximum Amount
       */
    static getRandomInt(min, max) {

      if (isNaN(min) || isNaN(max)) throw new TypeError('[OBJECT] Must be a valid number, or have a value of a VALID number')
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
          /**
       * @param text - String to Substring
       * 
       * @typeof text must be a string
       */
    static shorten(text, {amount = 2048, method = 'loop'}) {
      if (typeof text !== `string`) throw new TypeError('Text must be a string or have a value of a string')
      if (method === 'loop'){
      let i;
      for (i = 0; i < text.length; i += amount){
        return text.substring(i, Math.min(text.length, i + amount))
      }
    } else {
      if (method === 'simple'){
        return text.substring(0, amount)
      }
    }
    }
    static listGuilds(client){
      client.guilds.cache.forEach(g => {
        return console.log(`${g.name} | ${g.memberCount} | ${g.owner.user.id} - ${g.owner.user.username}`)
      })
    }
          /**
       * @param {number} length
       * 
       * @param {string} type
       * 
       * @example
       * let myID = this.generateID(24, {type = 'numbersonly'});
       * console.log(myID)
       */
    static generateID(length, {type = null}) {
      if (type === null){
        let resultID = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let i;
        for (i = 0; i < length; i++ ) {
           resultID += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return resultID;
      } else {
        if (type.toLowerCase() === 'numbersonly'){
        let ID = '';
        let numbers = '0123456789'
        for (let i = 0; i < length; i++){
          ID += numbers.charAt(Math.floor(Math.random() * numbers.length))
        }
        return ID;
      } else {
        if (type.toLowerCase() === 'lettersonly'){
          let resultID = '';
          let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
          let i;
          for (i = 0; i < length; i++ ) {
             resultID += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          return resultID;
        }
      }
    }
   }
    /**
      * @param {number} milliseconds - Time to convert 
      * @typeOf Type must be a number
      * @example 
      * let time = this.realTime(300000);
      * console.log(time.hours)
    */
   static realTime(milliseconds){
      if (typeof milliseconds !== `number`) throw new TypeError(`${milliseconds} is not a valid number`)
    const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
    return {
      days: roundTowardsZero(milliseconds / 86400000),
      hours: roundTowardsZero(milliseconds / 3600000) % 24,
      minutes: roundTowardsZero(milliseconds / 60000) % 60,
      seconds: roundTowardsZero(milliseconds / 1000) % 60,
      milliseconds: roundTowardsZero(milliseconds) % 1000,
      microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
      nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
    }
   }
   static setPrecence(client){
     /**
      * @param {object} client - new Discord.Client()
      */
    let precenses = ['Cards with the Phantom Troupe', 'Duel with Hisoka', 'Revenge on the Chain user', 'The spiders', 'Still no custom status for bots huh?']
    let type = {type: 'streaming'.toUpperCase(), url: 'https://www.twitch.tv/theonehisoka17'}
    setInterval(() => { 
    let precense = this.getRandom(precenses)
    client.user.setActivity(precense, type)
    }, 5000)
  }
   static sendErrorEmbed(message){
     /**
      * @param {object} message - new Discord.Message()
      */
    let { MessageEmbed } = require('discord.js')
    let errorMessages = require('../assets/Json Files/errors.json')
    let random = errorMessages[Math.floor(Math.random() * errorMessages.length>2?errorMessages.length:2)]
    message.channel.send(new MessageEmbed() .setDescription(random) .setColor(require('../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
   }
   /**
    * 
    * @param {number} number
    * @example
    * let myNumber = realNumber(456)
    * console.log(myNumber) 
    */
   static realNumber(number){
    let numberEnd;
    let num = `${number}`
    if (num.endsWith(1)) numberEnd = 'st'
    if (num.endsWith(2)) numberEnd = 'nd'
    if (num.endsWith(3)) numberEnd = 'rd'
    if (num.endsWith(4) || num.endsWith(5) || num.endsWith(6) || num.endsWith(7) || num.endsWith(8) || num.endsWith(9) || num.endsWith(0)) numberEnd = 'th'
    return numberEnd;
   }
   /**
    * @param {object} object
    * 
    * @example
    * const obj = {name: 'Hisoka', id: 1234, region: 'NA'}
    * let array = this.objectToArray(obj)
    * console.log(array)
    * @returns String[Array]
    */
   static objectToArray(object){
     if (typeof object !== 'object') throw new TypeError(`Input must be of TYPE Object`)
     let arr = [];
     for (const [property, value] of Object.entries(object)){
       arr.push(`${property}: ${value}`)
     }
     return arr;
   }
   /**
    * 
    * @param {object} client 
    * @param {string} id
    * @returns Object 
    */
   static getUser(client, id){
     let user = typeof id === 'number' ? client.users.cache.get(id) : client.users.cache.find(u => u.username === id)
     return user;
   }
   /**
    * 
    * @param {object} message 
    * @param {string} id
    * @returns Object 
    */
   static getMember(message, id){
    return typeof id === 'number' ? message.guild.members.cache.get(id) : message.guild.members.cache.find(function(m){m.username === id})
   }
   /**
    * 
    * @param {string} album 
    */
   static async randomFromImgurAlbum(album) {
    let request = require('node-superfetch')
		const { body } = await request
			.get(`https://api.imgur.com/3/album/${album}`)
			.set({ Authorization: `Client-ID ${require('../config.json').IMGUR_API_KEY}` });
		if (!body.data.images.length) return null;
		return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;
	}
  /**
   * @param {string} url
   * @param {{headers:object}} options
   * @returns {Promise<object>}
   */
  static async sendHttpRequest(url, options = {}){
    return new Promise(async (resolve, reject) => {
      let request = require('node-superfetch')
      if (!url.startsWith('http')) reject(new TypeError('Invalid URL'))
        let res;
        if (options.headers){
          res = await request.get(url).set(options.headers)
        } else {
          res = await request.get(url)
        }
        if (!res.ok || res.status !== 200) reject(new Error(`${res.status}: ${(res).statusText}`))
        return resolve(res.body)
    })
  }
  /**
   * 
   * @param {string} endpoint 
   * @returns {Promise<string>}
   */
  static async getNekoImage(endpoint){
    return new Promise(async (resolve) => {
      let res = await this.sendHttpRequest(`https://nekos.life/api/v2/img/${endpoint}`)
      return resolve(res.url)
    })
  }
  /**
   * 
   * @param  {...string} paths 
   * @returns String
   */
  static joinDir(...paths){
    if (!paths.length || paths.length <= 1) throw new Error('Path not found');
    let path = '';
    let i = 0;
     for (; i < paths.length; i++){
      if (i === 0) {
         path += paths[0]
         } else {
         path += `/${paths[i]}`
         }
  }
   return path;
  }
  /**
   * 
   * @param {Array<any>} array 
   * @returns {Array<any>}
   */
  static shuffle(array) {

    for (let ind = array.length - 1; ind > 0; ind--){
        let j = Math.floor(Math.random() * (ind + 1));
        let temp = array[ind];
        array[ind] = array[j];
        array[j] = temp;
    }
    return array;
  }
  /**
   * 
   * @param {string} url 
   * @returns {string}
   */
  static validateImage(url){
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    let result;
    if (url.match(regex)){
      result = {
        match: url.match(regex)
      }
    } else {
      result = false;
    }
    return result;
  }
  /**
   * @param {number} ms
   * @returns {Promise<void>}
   */
  static delay(ms){
    return new Promise((resolve) =>  setTimeout(resolve, ms))
  }
}
module.exports = UtilFiles;