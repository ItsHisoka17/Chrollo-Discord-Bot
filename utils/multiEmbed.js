class multiEmbed{
	constructor(embeds, time, message){
		this.embeds = embeds
		this.time = time
		this.message = message
	}
	async startMultiEmbeds(){
		let message = this.message
		let slide = 0
		let time = this.time
		let embed = await message.channel.send(this.embeds[slide])
		await embed.react('⬅️')
		await embed.react('➡️')
		const firstFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id == message.author.id
		const SecondFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id == message.author.id
		const firstCollector = embed.createReactionCollector(firstFilter, {time: time})
		const SecondCollector = embed.createReactionCollector(SecondFilter, {time: time})
		SecondCollector.on('collect', async r => {
			await r.users.remove(message.author)
			if(slide == 0){
				slide = this.embeds.length - 1
			}else{
				slide--
			}
			await embed.edit(this.embeds[slide])
		})
		firstCollector.on('collect', async r => {
			await r.users.remove(message.author)
			if(slide == this.embeds.length - 1){
				slide = 0
			}else{
				slide++
			}
			await embed.edit(this.embeds[slide])
		})
	}
}
module.exports = multiEmbed;