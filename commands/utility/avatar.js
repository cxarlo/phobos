module.exports = {
	name: "avatar",
	alias: ["av", "pfp"],
	description: "Fetches the avatar/profile picture of a user.",
	usage: "[user]",
	async execute(message, args) {
		const { author, channel, guild, mentions } = message;

		let user = author;
		if (channel.type !== "dm") {
			let member = mentions.members.first() || guild.members.cache.get(args[0]);
			if (member)
				user = member.user;
		}

		const url = user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 });

		message.reply({embed: {
			title: "Avatar",
			url,
			color: 2793983,
			author: {
				name: user.tag,
				icon_url: user.displayAvatarURL({ dynamic: true })
			},
			image: { url }
		}});
	}
};