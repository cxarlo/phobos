const ownerId = process.env.OWNER_ID;

const catchers = [

	function imDad(message) {
		const { author, content } = message;
		if (author.id === ownerId) return;
		const match = content.match(/^i\s*['`a]?\s*m\s*([\s\S]*)/i);
		if (match)
			message.reply(`Hi **${match[1] === "" ? "blank" : match[1]}**, I'm dad!`);
	},

	function brrr(message) {
		if (message.content.toLowerCase().includes("brrr"))
			(async () => {
				try {
					await message.react("🏎️");
					await message.react("🇻");
					await message.react("🇷");
					await message.react("🇴");
					await message.react("🅾️");
					message.react("🇲");
				// eslint-disable-next-line no-empty
				} catch(e) {}
			})();
	},

	function normal(message) {
		const words = {
			sad: "Don't be sad, I'm here for you \\:)",
			nice: "Nice",
			phobos: "who called me"
		};
		const messageWords = message.content.toLowerCase().split(/ +/);
		const word = Object.keys(words).find(word => messageWords.includes(word));
		if (word)
			message.reply(words[word]);
	}

];

module.exports = async function(message) {
	catchers.forEach(func => func(message));
};