module.exports = {
	name: "playtop",
	alias: ["pt", "ptop"],
	description: "Adds a song on the top of the queue.",
	args: true,
	usage: "<link|query>",
	guildOnly: true,
	async execute(message, args) {
		const { client: { distube }, guild, member } = message;

		if (!member.voice.channelID)
			return message.reply(":x: **You have to be in a voice channel to use this command**");

		const query = args.join(" ");
		message.reply(`:mag_right: **Searching** \`${query}\``);
		await distube.play(message, query);
		const songs = distube.getQueue(guild.id).songs;
		songs.splice(1, 0, songs.pop());
	}
};