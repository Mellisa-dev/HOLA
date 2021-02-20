const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Client({disableMentions: "everyone"});

//Command Handler
client.commands = new Collection();
client.aliases = new Collection();

//Command Folder location
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Bot Status
client.on("ready", () => {
console.log(`nombre de bot ${client.user.username}`);
client.user.setActivity('Puedes usar l!help para ver mi lista de comandos', { type: 'WATCHING' });
});

client.on("message", async message => {
    //Loads prefix from config.json
    const prefix = (config.prefix);
    //Makes sure bot wont respond to other bots including itself
    if (message.author.bot) return;
    //Checks if the command is from a server and not a dm
    if (!message.guild) return;
    //Checks if the command starts with a prefix
    if (!message.content.startsWith(prefix)) return;
    //Makes sure bot wont respond to other bots including itself
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
}); 

client.login(config.token);