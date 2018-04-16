if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

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
const Aliases = require('./Modules/Aliases.js');
const Prefixes = require('./Modules/Prefixes.js');

// Setup commands
Cmds.setUp();

// Setup aliases
Aliases.setUp();

// Setup Prefixes
Prefixes.setUp();

// Set Discord Bot Token
const Discord_Token = process.env.DISCORD_TOKEN;

// Array of valid prefixes
const prefix = Config.prefixes;

// Console log when we connect
client.on('ready', () => {
    Log.full('Connection', `Logged in as ${client.user.tag}!`);

    // Guilds
    guildsLogFileString = "";
    client.guilds.forEach(guild => {
        guildsLogFileString += `Name: ${guild.name}\n\tOwner: ${guild.owner.user.tag}\n`;
    });

    Log.console(`Connected to ${client.guilds.array().length} server/s`,'Servers');
    Log.file(`\n${guildsLogFileString}`,'Servers');
});

client.on('message', msg => {

    // Don't respond to it self.
    if (msg.author == client.user)
        return;

    // Chat logging
    if (Config.chatLogging)
    {
        var guild = msg.guild;
        var guildName = "undefined";
        if (guild.available)
            guildName = guild.name;

        Log.file(`#${msg.channel.name} | ${msg.content}`, `../guilds/${guildName}/logs/chat`);
    }

    // Check if the message is a command
    if (prefix.indexOf(msg.content[0]) != -1 || Prefixes.prefixes[msg.guild.name.toLowerCase()].indexOf(msg.content[0]) != -1)
    {
        Log.full(`../guilds/${guildName}/logs/commands`, `@${msg.guild.name} | #${msg.channel.name} | ${msg.author.tag} | ${msg.content}`);

        // If command exists
        var cmdIndex = Cmds.commands.indexOf(msg.content.split(" ")[0].slice(1).toLowerCase());
        if (cmdIndex != -1)
        {
            Cmds.commandsModule[cmdIndex].run(msg, client);
            return;
        };

        // Alias Code
        // Guild does not have a alias object
        if (!Aliases.aliases.hasOwnProperty(msg.guild.name.toLowerCase()))
            return;

        // Does it an alias
        var cmd = msg.content.split(" ")[0].slice(1).toLowerCase();
        if (Aliases.aliases[msg.guild.name.toLowerCase()].hasOwnProperty(cmd))
        {
            var actualCmd = Aliases.aliases[msg.guild.name.toLowerCase()][cmd];
            var cmdIndex = Cmds.commands.indexOf(actualCmd);
            if (cmdIndex != -1)
            {
                Cmds.commandsModule[cmdIndex].run(msg, client);
                return;
            };

        }

    }
});

// Log in
client.login(Discord_Token);

process.on('unhandledRejection', (err) => console.log('Promise was rejected but there was no error handler: ' + err))
