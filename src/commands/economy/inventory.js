const User = require("../../db/user");
const { getItem } = require("../../const/economyStore");

function processInventory(inventory) {
	const items = Object.entries(inventory).filter(e => e[1] > 0);
	if (items.length !== 0)
		return items.map(([name, count]) => [getItem(name), count])
			.map(([item, count], i) => `\`${i+1}.\` ${item.name}${count === 1 ? "" : ` × ${count}`} (${item.price * count}$)`)
			.join("\n");
	return "\\*empty\\*";
}

module.exports = {
	name: "inventory",
	alias: ["inv"],
	description: "Check your inventory or a user's.",
	usage: "[user]",
	cooldown: 5,
	async execute(message, args) {
		const { author, guild, member, mentions } = message;

		let targetMember = member, targetUser = author;
		if (args[0]) {
			const target = mentions.members.first() || guild.members.cache.get(args[0]);
			if (!target)
				return message.reply(":x: User doesn't exist");
			targetUser = target.user, targetMember = target;
		}

		const udb = await User(targetUser.id);
		const { inventory } = udb.get();

		message.reply({embed: {
			description: processInventory(inventory),
			color: 4404979,
			author: {
				name: `${targetMember?.displayName || targetUser.username}'s Inventory`,
				url: "https://phobos.marsron.repl.co",
				icon_url: targetUser.displayAvatarURL({ dynamic: true })
			}
		}});
	}
};