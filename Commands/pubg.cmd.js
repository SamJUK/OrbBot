const request = require('request');
const Config = require('../Modules/Config.js');
const Utils = require('../Modules/Utils.js');

const PUBG_API = {
    "Key" : process.env.PUBG_TOKEN,
    "Base_URL" : Config.PUBG_API_BASE
};

module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        // Missing Parameters
        if (msgArray.length <= 1)
        {
            msg.reply("Missing Parameters!");
            return;
        };

        // Parse details
        var details = {
            'username': msgArray[1]
        };

        // Get Mode if available
        if (msgArray.length >= 2)
        {
            if (["solo", "solos", "single"].indexOf(msgArray[2]) != -1)
                details.gamemode = "solo";
            if (["duo", "duos", "twos"].indexOf(msgArray[2]) != -1)
                details.gamemode = "duo";
            if (["squad", "squads", "teams", "groups"].indexOf(msgArray[2]) != -1)
                details.gamemode = "squad";
        }

        // Get Location if available
        if (msgArray.length >= 3)
            details.location = msgArray[3];

        // Data to pass through to the anon callback
        passthrough = {};
        passthrough.details = details;
        passthrough.msg = msg;

        this.getPubgStats(details, passthrough, (data, passthrough) => {
            var json = JSON.parse(data);

            dataObject = {};
            dataObject.season = json["seasonDisplay"];

            var stats = json["Stats"];

            stats.forEach(function(stat) {
                var region = stat.Region;
                var mode = stat.Match;
                var kd = stat.Stats[0].value;
                var wins = stat.Stats[4].value;
                var rating = stat.Stats[9].value;

                if (!dataObject.hasOwnProperty(region))
                    dataObject[region] = {};

                if (!dataObject[region].hasOwnProperty(mode))
                    dataObject[region][mode] = {};

                dataObject[region][mode]["kd"] = kd;
                dataObject[region][mode]["wins"] = wins;
                dataObject[region][mode]["rating"] = rating;
            }, this);

            // No game mode specified - So get default to solo
            if (passthrough.details.gamemode == null)
                passthrough.details.gamemode = "solo";

            var chosenObject = dataObject["agg"][passthrough.details.gamemode.toLowerCase()];

            msg.reply(`${passthrough.details.username}'s Aggregate ${passthrough.details.gamemode}'s Stats Are\n **KD:** ${chosenObject.kd}\n **Wins:** ${chosenObject.wins}\n **Rating:** ${chosenObject.rating}`);
        });
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
        return "";
    },

    getPubgStats: function (userOBJ, passthrough, callback)
    {
        var url = PUBG_API.Base_URL + userOBJ.username;

        request({uri: url, headers: { 'TRN-Api-Key': PUBG_API.Key }, method: 'GET'}, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        callback(body, passthrough); // Return what we receive
        });
    }

};
