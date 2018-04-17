const request = require('request');
const Log = require('../Modules/Logging.js');
const Config = require('../Modules/Config.js');
const Utils = require('../Modules/Utils.js');

const PUBG_API = {
    "Key" : process.env.PUBG_TOKEN,
    "Base_URL" : Config.PUBG_API_BASE
};

const regions = ["na", "eu", "as", "oc", "sa", "sea", "krjp"];
const modes   = ["solo", "duo", "squad", "solo-fpp", "duo-fpp", "squad-fpp"];
const seasons = ["2017-pre1", "2017-pre2", "2017-pre3", "2017-pre4", "2017-pre5", "2017-pre6", "2018-01", "2018-02", "2018-03", "2018-04"];

module.exports = {

    /**
     * What is run when someone enters this in chat
     *
     * @TODO: Abstract into custom module & make command order irrelevant
     * @TODO: Add caching
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        // Missing Parameters
        if (msgArray.length <= 1)
        {
            msg.reply("You need to provide atleast a PUBG nickname `!pubg samjuk`");
            return;
        };

        // Parse details
        var details = {
          "region" : "eu",
          "mode" : "solo",
        };
        var parseArray = msgArray;
        parseArray.splice(0, 1); // Remove '!pubg'

        // Parse Modes
        // Comparse parse Array to modes, when value found in both, set idx to index of value in modes and exit.
        if(parseArray.some(c => (idx = modes.indexOf(c)) !== -1 )){
          details.mode = modes[idx];
          parseArray.splice(parseArray.indexOf(modes[idx]), 1);
        }

        // Parse Regions
        if(parseArray.some(c => (idx = regions.indexOf(c)) !== -1 )){
          details.region = regions[idx];
          parseArray.splice(parseArray.indexOf(regions[idx]), 1);
        }

        // Parse Seasons
        if(parseArray.some(c => (idx = seasons.indexOf(c)) !== -1 )){
          details.season = seasons[idx];
          parseArray.splice(parseArray.indexOf(seasons[idx]), 1);
        }

        // Get username
        if(parseArray.length < 1){
          msg.reply('Missing a username');
          return;
        }else{
          details.username = parseArray[0];
        };


        // Data to pass through to the anon callback
        passthrough = {};
        passthrough.details = details;
        passthrough.msg = msg;

        this.getPubgStats(details, passthrough, (data, passthrough) => {
            try{
              var json = JSON.parse(data);
            }catch(exception){
              Log.full('pubg', 'unexpected data returned: ' + data);
              passthrough.msg.reply('Got unexpected data, sned help!');
              return;
            };

            if(json.hasOwnProperty('error')){
              Log.full('pubg', 'Error returned: ' + data);
              var msg = (json.error.substr(0, 33) === "Api is disabled due to throttling")
                ? 'Error: ' + json.error
                : 'Beep Boop Error ****';
              passthrough.msg.reply(msg);
              return;
            }

            // @TODO: Finish gathering stats, no docs / example responses to build off & API Down
            //        So log for later dev work
            Log.full('pubgapi', data);
        });
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
        var m='',s='',r='';
        for(let idx in modes) m += `\`${modes[idx]}\` `;
        for(let idx in regions) r += `\`${regions[idx]}\` `;
        for(let idx in seasons) s += `\`${seasons[idx]}\` `;
        return `Get stats for PUBG player \n\nModes: ${m}\nRegions: ${r}\nSeasons: ${s}`;
    },

    getPubgStats: function (userOBJ, passthrough, callback)
    {
        var url = PUBG_API.Base_URL + userOBJ.username;
        delete userOBJ.username;

        // Build Req Params
        var req = '?';
        for(var param in userOBJ)
          req += `${param}=${userOBJ[param]}&`;

        if(req !== '?')
          url += req.slice(0, -1);

        Log.full('pubg', 'Getting PUBG Stats for' + url);
        request({uri: url, headers: { 'TRN-Api-Key': PUBG_API.Key }, method: 'GET'}, function (error, response, body) {
        if(error !== null)
          Log.full('pubg', 'Error: ' + error);
        Log.full('pubg', 'HTTP Status: ' + response.statusCode);
        callback(body, passthrough); // Return what we receive
        });
    }

};
