const fs = require("fs-extra");

module.exports = {

    // Storage for ranks
    ranks: {},

    // Available ranks
    availableRanks: {
        "0" : "Blocked",
        "1" : "Normal",
        "2" : "Moderator",
        "3" : "Administrator",
        "4" : "Owner",
        "5" : "Developer"
    },

    // Setup
    setUp: function ()
    {
        // Get all GUILDS 
        var guilds = fs.readdirSync('./guilds');
        
        // Check if the item is a directory
        guilds.forEach( guild => {

            if ( guild == '.gitignore')
                return;

            // Make a directory if it does not exist
            if (!fs.lstatSync(`./guilds/${guild}`).isDirectory())
                fs.ensureDirSync(`./guilds/${guild}`)

            // Check if it does not has a rank file create one
            if (!fs.existsSync(`./guilds/${guild}/ranks.json`))
            {
                fs.writeJsonSync(`./guilds/${guild}/ranks.json`, {});
                this.ranks[guild] = {};
                return;
            };

            // Parse ranks into object
            var ranksObject = fs.readJsonSync(`./guilds/${guild}/ranks.json`);;

            // Append it to the ranks object
            this.ranks[guild] = ranksObject;
        });
    },

    // Get users rank for current server
    rank: function (msg, guild, user)
    {
        // Check if guild is not in object
        if (!this.ranks.hasOwnProperty(guild))
            this.ranks[guild] = {};

        // User has no rank
        if (!this.ranks[guild].hasOwnProperty(user.id))
        {
            this.ranks[guild][user.id] = 0;
        };

        var rankid = this.ranks[guild][user.id];
        var rankName = "wut";
        if (this.availableRanks.hasOwnProperty(rankid))
            var rankName = this.availableRanks[rankid];

        msg.reply(`Your rank is ${rankid}/${rankName}`);
    },

    // Display all ranks for the current server
    ranks: function (msg, guild)
    {
        msg.reply(JSON.stringify(this.availableRanks));
    },

    // Set the users rank 
    set: function (msg, guild, user, rank)
    {
        // Check if guild exists
        if (!this.ranks.hasOwnProperty(guild))
            this.ranks[guild] = {};

        if ( isNaN(parseInt(rank)) || rank > Object.keys(this.availableRanks).length)
            return;

        this.ranks[guild][user.id] = rank;
    },

    // Promote the user to the rank 1 above
    promote: function (msg, guild, user)
    {

    },

    // Demote the user to the rank 1 below
    demote: function (msg, guild, user)
    {

    },

    // List everyones rank for every server
    list: function (msg)
    {
        msg.reply(JSON.stringify(this.ranks));
    }



};