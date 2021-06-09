const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/BaseCommand')
const weather = require('weather-js')

class Weather extends Command {
  constructor(client){
  super(client, {
  name: 'weather',
  category: 'Search',
  description: 'Finds the weather for a location',
  usage: 'weather <location>',
})
}
async execute(message, client, args) {
    if (!args.length) {
        return message.channel.send(new MessageEmbed() .setDescription('Invalid Args: Please provide a location') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
      }
    try {
        let embed = await message.channel.send(new MessageEmbed() .setDescription(`:sun_with_face: Searching the weather for **${args.join(" ")}**`) .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])))
        weather.find({ search: args.join(" "), degreeType: "C" }, function(err, result) {
  
          if (err) return message.channel.send(new MessageEmbed() .setDescription('Oops, an error ocurred') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
          if(result === undefined || result.length === 0) return embed.edit(new MessageEmbed() .setDescription('**Invalid** location') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));

          var current = result[0].current;
          const ct = current.temperature;
          let col;
            
          if (ct <= 0) col = 13431807;
          else if (ct < 0 && ct >= 5) col = 12579071;
          else if (ct >= 6 && ct <= 10) col = 11861906;
          else if (ct >= 11 && ct <= 15) col = 9238900;
          else if (ct >= 16 && ct <= 20) col = 15531898;
          else if (ct >= 21 && ct <= 25) col = 16763258;
          else if (ct >= 26 && ct <= 30) col = 16739910;
          else if (ct >= 31 && ct <= 35) col = 16730914;
          else if (ct >= 36 && ct <= 40) col = 16727074;
          else if (ct >= 40) col = 12386304;
          else col = 7654911;
             embed.edit(
             new MessageEmbed()
            .setColor(col)
            .setTitle(`☀️ | __**Weather information for ${current.observationpoint}**__`)
            .setDescription(`The weather is **${current.skytext}** at the moment.`)
            .addField('• Temperature:', `**${ct}°C** / ${((1.8 * ct) + 32).toFixed(0)}°F`)
            .addField('• Feels like:', `**${current.feelslike}°C** / ${((1.8 * current.feelslike) + 32).toFixed(0)}°F`)
            .addField('• Humidity:', `**${current.humidity}%**`)
            .addField('• Wind:', `**${current.winddisplay}** / ~${(current.winddisplay.replace(/[^0-9]/g,"") * 0.621).toFixed(1)} mph`)
            .setThumbnail(current.imageUrl)
            .setFooter(`Correct as of ${current.observationtime.slice(0, -3)} local time`)
            .setTimestamp()
             )
        });
      } catch (err) {
        return message.channel.send(new MessageEmbed() .setDescription('Oops, an error ocurred') .setColor(require('../../utils/utils').getRandom(['0xfff8f7', '#eba0c4'])));
      }
}
}

module.exports = Weather;