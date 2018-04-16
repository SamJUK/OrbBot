const fs = require("fs-extra");

module.exports = {

    aliases: {},

    setUp: function ()
    {
        // Read all the servers alises and compile into the object

        // Get all GUILDS 
        var guilds = fs.readdirSync('./guilds');
        
        // Check if the item is a directory
        guilds.forEach( guild => {
            
            // Is it is not a directory
            if (!fs.lstatSync(`./guilds/${guild}`).isDirectory())
                return;

            // Check if it does not has a alias file
            if (!fs.existsSync(`./guilds/${guild}/aliases.json`))
            {
                this.aliases[guild] = {};
                return;
            }

            // Read alises into string
            var aliasesTEXT = fs.readFileSync(`./guilds/${guild}/aliases.json`);

            // Parse aliases into object
            var aliasesObject = JSON.parse(aliasesTEXT);

            // Append it to the alises object
            this.aliases[guild] = aliasesObject;
        });
    },

    add: function (guild, alias, cmd) 
    {
        guild = guild.toLowerCase();

        // Guild not in aliases object
        if (!this.aliases.hasOwnProperty(guild))
            return;

        // Alias already taken
        if (this.aliases[guild].hasOwnProperty(alias))
            return;

        // Add to the alias object
        this.aliases[guild][alias] = cmd;

        // Update File
        this.updateFile(guild);
    },

    remove: function (guild, alias)
    {
        guild = guild.toLowerCase();
        alias = alias.toLowerCase();

        // Guild is not in aliase object
        if (!this.aliases.hasOwnProperty(guild))
            return;

        // Alias does not exist anyway
        if (!this.aliases[guild].hasOwnProperty(alias))
            return;

        // Remove the alias
        delete this.aliases[guild][alias];

        this.updateFile(guild);

    },

    updateFile: function (guild)
    {
        // Check if the guild does not have a json file
        if (!fs.existsSync(`./guilds/${guild.toLowerCase()}/aliases.json`))
        {
            console.log("What json file?");
            return;
        }

        // If there is no object in alises for guild
        if (!this.aliases.hasOwnProperty(guild.toLowerCase()))
        {
            console.log("No alises for guild?");
            return;
        }

        // Write aliases to file
        var data = this.aliases[guild.toLowerCase()];
        fs.writeFileSync(`./guilds/${guild.toLowerCase()}/aliases.json`, JSON.stringify(data));
    }

};