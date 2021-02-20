const Discord = require('discord.js')
const client = new Discord.Client({ disableMentions: 'everyone' })

module.exports = {
    name: "say",
    aliases: "s",

    async run (client, message, args) {

      if(!args[0]) return message.channel.send('Escribe algo ...');

      const sayargs = args.join(" ");
      message.delete().catch(O_o=>{});
      message.channel.send(sayargs)

    }
} 