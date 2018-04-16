const request = require('request');
const fs = require('fs');
const Log = require('../Modules/Logging.js');
const Utils = require('../Modules/Utils.js');
const Config = require('../Modules/Config.js');

const FN_API = {
    "Key" : process.env.FORTNITE_TOKEN,
    "Base_URL" : Config.FORNITE_API_BASE
};

module.exports = {

    /**
     * What is run when someone enters this in chat
     *
     * Command Format:
     *    - !fortnite [player_name] [platform]
     *      - platform [xbl, psn, pc]
     */
    run: function (msg)
      {
        var msgArray = msg.content.split(' ');

        // Missing Param Guard
        if(msgArray.length <= 1)
        {
          msg.reply('Missing Parameter, see `See !help fortnite`');
          return;
        }

        // Parse
        var data = {
          username: msgArray[1],
          platform: (msgArray.length >= 3) ? msgArray[2] : 'pc'
        };

        var passthrough = {
          data: data,
          message: msg
        };

        this.getForniteStats(data, passthrough, (data, passthrough) => {
          var json = JSON.parse(data);

          if(json.hasOwnProperty('error')){
            msg.reply('Whoops! An error occurred 🤷');
            console.log(json);
            return;
          }

          try{
            var dir = `cache/${passthrough.data.platform}/`;
            var path = `${dir}${passthrough.data.username}.cache`;

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }

            fs.writeFileSync(path, data, 'utf8');
          }catch(exception){
            console.log(exception);
          }

          var stats = '';
          for(var stat in json.lifeTimeStats)
            stats += `**${json.lifeTimeStats[stat]["key"]}:** ${json.lifeTimeStats[stat]["value"]}\n`;

            msg.reply(`\n**${json.epicUserHandle}**'s Life time **${json.platformNameLong}**'s Stats Are\n${stats}`);
        });

    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return ('Command Format: `!fortnite [username] [platform]` Available Platforms `pc | xbl | psn`');
    },

    getForniteStats: function (data, passthrough, callback)
    {

      if(this.isCached(data)){
        Log.full('fortnite', `Using cached data for: ${data.platform} - ${data.username}`)
        callback(
          this.getCached(data),
          passthrough
        )
        return;
      }

      var url = `${FN_API.Base_URL}${data.platform}/${data.username}`;
      Log.full('fortnite', 'Fetching Fortnite Stats: ' + url);
      request({uri: url, headers: { 'TRN-Api-Key': FN_API.Key.trim() }, method: 'GET'}, function (error, response, body) {
        if(error != null)
          Log.full('fortnite', 'error:', error); // Print the error if one occurred
          Log.full('fortnite', console.log('statusCode:', response && response.statusCode)); // Print the response status code if a response was received
        callback(body, passthrough);
      });
    },

    isCached: function (data)
    {
      // File Exist
      var path = `cache/${data.platform}/${data.username}.cache`;

      if(!fs.existsSync(path)) return false;
      var mtime = (new Date() - new Date(fs.statSync(path).mtime));

      // 10 min
      return (mtime < 600000);
    },

    getCached: function (data)
    {
      var path = `cache/${data.platform}/${data.username}.cache`;
      var res = fs.readFileSync(path, 'utf-8');
      return res;
    }

};
