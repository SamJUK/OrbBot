const fs = require("fs-extra");

module.exports = {
  prefixes: {},

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
            if (!fs.existsSync(`./guilds/${guild}/prefixes.json`))
            {
                this.prefixes[guild] = [];
                return;
            };

            // Read alises into string
            var prefixesTEXT = fs.readFileSync(`./guilds/${guild}/prefixes.json`);

            // Parse aliases into object
            var prefixesObject = JSON.parse(prefixesTEXT);
            // Append it to the alises object

            if (prefixesObject.hasOwnProperty('prefixes'))
                this.prefixes[guild] = prefixesObject.prefixes;
        });
    },

    add: function (guild, prefix)
    {
        guild = guild.toLowerCase();

        // Guild not in prefixes object
        if (!this.prefixes.hasOwnProperty(guild))
            return;

        // Prefix already taken
        var index = this.prefixes[guild].indexOf(prefix);
        if (index != -1)
            return;

        // Add to prefixes object
        this.prefixes[guild].push(prefix[0]);

        // Update file
        this.updateFile(guild);
    },

    remove: function (guild, prefix)
    {
        guild = guild.toLowerCase();
        prefix = prefix.toLowerCase();

        // Guild is not in aliase object
        if (!this.prefixes.hasOwnProperty(guild))
            return;

        var index = this.prefixes[guild].indexOf(prefix);
        
        // Prefix is not in array
        if (index == -1)
            return;

        // Remove the prefix
        this.prefixes[guild].splice(index, 1);

        this.updateFile(guild);
    },

    updateFile(guild)
    {
        // Check if the guild does not have a json file
        /*if (!fs.existsSync(`./guilds/${guild.toLowerCase()}/prefixes.json`))
        {
            return;
        }*/

        // If there is no object in alises for guild
        if (!this.prefixes.hasOwnProperty(guild.toLowerCase()))
        {
            console.log("No alises for guild?");
            return;
        }

        // Write prefixes to file
        var data = this.prefixes[guild.toLowerCase()];
        var jData = {"prefixes":data};
        fs.writeFileSync(`./guilds/${guild.toLowerCase()}/prefixes.json`, JSON.stringify(jData));
    }
};