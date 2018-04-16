const request = require('request');
const Log = require('./Logging.js');
const Utils = require('./Utils.js');

module.exports = {

    API_KEY: Utils.readFromFile('./Credentials/steam_web_api.key')[0],
    VANITY: {
        API_BASE: "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/"
    },

    // Return String - STEAM64 OR 'No User'
    resolveVanity: function (Vanity, passthrough, callback)
    {
        var url = `${this.VANITY.API_BASE}?key=${this.API_KEY}&vanityurl=${Vanity}`;

        var parse = body =>
        {
            var Data = JSON.parse(body);
            // Could not find user
            if (Data.response.success == 42)
                callback(Data.response.message, passthrough);
            
            if (Data.response.success == 1)
                callback(Data.response.steamid, passthrough);
        }

        request({uri: url, method: 'GET'}, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        parse(body, passthrough); // Return what we receive
        });
    }

};