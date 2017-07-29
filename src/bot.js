// File system Req
const fs = require('fs');

// Initalise Discord Shit
const Discord = require('discord.js'),
      client = new Discord.Client();

// Initalise own shit
const Config = require('./Modules/Config.js');
const Utils = require('./Modules/Utils.js');
const Log = require('./Modules/Logging.js');
const Cmds = require('./Modules/Commands.js');

// Setup commands
Cmds.setUp();

// Set Discord Bot Token
const Discord_Token = Utils.readFromFile('./Credentials/discord_bot.token')[0];

// Array of valid prefixes
const prefix = Config.prefixes;

// Console log when we connect
client.on('ready', () => {
    Log.full('Connection', `Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    // Check if the message is a command
    if (prefix.indexOf(msg.content[0]) != -1)
    {
        Log.full('Commands', `${msg.author.tag} | ${msg.content}`);

        var cmdIndex = Cmds.commands.indexOf(msg.content.split(" ")[0].slice(1).toLowerCase());
        // if command exists
        if (cmdIndex != -1)
        {
            Cmds.commandsModule[cmdIndex].run(msg);
        };
    }
});

// Log in
client.login(Discord_Token);