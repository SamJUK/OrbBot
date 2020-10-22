const fs = require('fs');
const Log = require('./Logging.js');

module.exports = {

    /**
     * Parse commands
    */
    commands: [],
    commandsModule: [],
    commandsRateLimit: {},

    setUp: function ()
    {
        this.commands = [];
        this.commandsModule = [];

        fs.readdirSync('./Commands/').forEach (file => {
            // Return if the file begins with double underscroes (__)
            if (file.split(" ")[0].slice(0, 2) == "__")
                return;
            
            Log.console(`Setting up ${file}`, "Commands");
            
            this.commands.push(file.split('.')[0]);
            this.commandsModule.push(require(`../Commands/${file}`));
        });
    },

    parse: function (msg)
    {
        var msgArray = msg.content.split(" ");
        var cmd = msgArray[0].slice(1);

        // Check if it is a valid command
        this.doesCommandExist(cmd);
    },

    getRateLimit: function(cmdIndex)
    {
        var rateLimit = this.commandsModule[cmdIndex].rateLimit || 1000;
        Log.console(`Rate limit for ${this.commands[cmdIndex]} is ${rateLimit}ms`, "Commands");
        return rateLimit;
    },

    isRateLimited: function (cmdIndex, author)
    {
        if(!this.commandsRateLimit.hasOwnProperty(cmdIndex)) {
            Log.console(`${this.commands[cmdIndex]} is not rate limited for any users`, "Commands");
            return false;
        }

        if(!this.commandsRateLimit[cmdIndex].hasOwnProperty(author.id)) {
            Log.console(`${this.commands[cmdIndex]} is not rate limited for ${author.tag}`, "Commands");
            return false;
        }

        var lastExec = this.commandsRateLimit[cmdIndex][author.id];
        var now = (new Date()).getTime();
        var diff = now - lastExec;
        var rateLimit = this.getRateLimit(cmdIndex);

        if(diff > rateLimit) {
            Log.console(`${this.commands[cmdIndex]} is not rate limited for ${author.tag} since rateLimit has elapsed`, "Commands");
            return false;
        }

        return (rateLimit - diff);
    },

    addRateLimit: function (cmdIndex, author)
    {
        if(!this.commandsRateLimit.hasOwnProperty(cmdIndex)) {
            this.commandsRateLimit[cmdIndex] = {};
        }

        this.commandsRateLimit[cmdIndex][author.id] = (new Date()).getTime();
        Log.console(`Updated rate limit for ${author.tag} using ${this.commands[cmdIndex]} command`, "Commands");
    },

    getRateLimitResponse: function (rate)
    {
        var time = rate / 1000;
        var formattedTime = rate >= 1000 ? `${Math.round(time)}s` : `${rate}ms`;

        return `Sorry, this command is on a cooldown for you try again in ${formattedTime}`
    },

    doesCommandExist: function (cmd)
    {

    },

    getChannelNameAndServerNameFromId: function(channelId, client)
    {
        var ids = [];
        var channels = client.channels.array()
            .map(c => {
                ids.push(c.id);
                return `${c.guild.name}_${c.name}`;
            });

        if(ids.includes(channelId)) {
            return channels[ids.indexOf(channelId)];
        }

        return false;
    }
};