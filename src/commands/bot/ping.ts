import { Message } from 'discord.js'

import { timeToDHMS } from '../../utils'

export default {
  name: 'ping',
  alias: ['uptime'],
  description: "Checks the bot's latency.",
  execute (message: Message) {
    const { uptime, ws } = message.client
    message.reply(':ping_pong: Pong!').then(msg => msg.edit({
      embed: {
        fields: [
          ['Bot Latency', `${Date.now() - msg.createdTimestamp}ms`],
          ['API Latency', `${Math.round(ws.ping)}ms`],
          ['Uptime', timeToDHMS(uptime!)]
        ].map(([name, value]) => ({ name, value, inline: true })),
        color: 0x4336F3,
        author: {
          name: 'Phobos',
          url: 'https://phobos.marsron.repl.co',
          icon_url: 'https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32'
        }
      }
    }))
  }
}