const request = require('request');
const Steam = require('../Modules/Steam.js');
const Utils = require('../Modules/Utils.js');
const Log = require('../Modules/Logging.js');

const CSGO_API = {
    API_BASE: "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730"
};

module.exports = {

    rateLimit: 5000,

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        // No username is defined
        if (msgArray.length <= 1)
        {
            msg.reply("Missing parameters.");
            return;
        };

        var id = msgArray[1];

        passthrough = {};
        passthrough.msg = msg;
        passthrough.user = id;
        passthrough.csgo = this;

        // Is a steam 64ID
        if (!isNaN(parseInt(id))){
            Log.full('csgo', `Steam 64ID passed (${id})`)
            this.getData(id, passthrough);
        }else{
          Log.full('csgo', `Steam Vanity URL Passed: ${id}`)
          Steam.resolveVanity(id, passthrough, (data, passthrough) => {
              // It's not a steam 64 ID
              if (isNaN(parseInt(data)))
              {
                  passthrough.msg.reply('Error: ' + data);
              };

              Log.full('csgo', `Vanity Url Resolved to ${data}`);
              passthrough.csgo.getData(data, passthrough);
          });
        };
    },

    // Steam64 = Steam 64 bit id as string
    getData: function (steam64, passthrough)
    {
        // Not a steam 64
        if (isNaN(parseInt(steam64)))
            return;

        var url = `${CSGO_API.API_BASE}&key=${Steam.API_KEY}&steamid=${steam64}`;

        request({uri: url, method: 'GET'}, function (error, response, body) {
          Log.full('csgo', `Fetching CSGO Stats: ${url}`);
            if(error != null)
              Log.full('csgo', `error: ${error}`);
            Log.full('csgo', `HTTP Status: ${response.statusCode}`);

            // Bad Response
            if(response.statusCode){
              passthrough.msg.reply(`I'm scared 😱 Server responded with ${response.statusCode}`);
              return;
            }

            passthrough.csgo.parseData(body, passthrough); // Return what we receive
        });

    },

    parseData: function (json, passthrough)
    {
      try{
        var Data = JSON.parse(json);
      }catch(exception){
        Log.full('csgo', `Server Reponse unexpected: ${json}`);
        passthrough.msg.reply('🤔 Server Response is not what i expect! Halp!');
        return false;
      }

        // Total Kills
        var TK = Data.playerstats.stats[0].value;
        // Total Deaths
        var TD = Data.playerstats.stats[1].value;
        // Headshots
        var HS = Data.playerstats.stats[25].value;
        // Kill Death Ratio
        var KD = (TK / TD).toFixed(2);
        // Headshot Percentage
        var HSP = (HS / TK).toFixed(2);

        passthrough.msg.reply(`Stats for ${passthrough.user}\n**KD:** ${KD}\n**HSP:** ${HSP}\n**Total Kills:** ${TK}\n**Total Deaths:** ${TD}\n**Total Headshots:** ${HS}`);

    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "Get CSGO stats `!csgo samj_uk`";
    }

};
