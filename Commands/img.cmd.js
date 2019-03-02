const Google = require('../Modules/Google.js');
const Config = require('../Modules/Config.js');

module.exports = {

    rateLimit: 5000,

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {

        var msgArray = msg.content.split(" ");

        // if (msg.author.id === '111106705319841792' && msgArray[1].toLowerCase() === 'kev'){
        //   Config.kevImage = msgArray[2];
        //   return;
        // }

        // if ( msg.author.id === '132279167998885888' ) {
        //   msg.reply(Config.kevImage)
        //   return;
        // }

        // Missing parameters
        if (msgArray.length <= 1)
        {
            msg.reply("Missing Parameters!");
            return;
        }

        // Defaults
        var safeSearch = "sfw";
        var phrase;

        // Check if the 1st parameter is safeSearch settings
        // @TODO Make order of nsfw/sfw not matter
        // - Reference fortnite.cmd.js
        if (["nsfw", "sfw", "all"].indexOf(msgArray[1].toLowerCase()) != -1 )
        {
            // safeSearch = msg.author.id === '132279167998885888' ? 'sfw' : msgArray[1];
            safeSearch = msgArray[1];
            if (msgArray.length <= 2)
            {
                msg.reply("Please give me a phrase to search");
                return;
            };

            var phrase = msgArray.slice(2).join(" ");
            if (phrase == '' || phrase == null || typeof(phrase) == 'undefined')
            {
                msg.reply('Please provided a search phrase');
                return;
            };

        }else{
            var phrase = msgArray.slice(1).join(" ");
            if (phrase == '' || phrase == null || typeof(phrase) == 'undefined')
            {
                msg.reply('Please provided a search phrase');
                return;
            };
        };

        Google.getRandomImage(phrase, urls => {
            if(typeof urls === 'object' && urls.hasOwnProperty('error')) {
                msg.reply('Its fucking broken pal: '+urls.error);
                return false;
            }
            var count = urls.length-1;
            var url = urls[Math.round(Math.random()*count)].url;
            msg.reply(url);
        }, safeSearch);
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "Get a random image from the first 5 pages of google. \n `!img [nsfw|sfw] [search string]`\n`!img sfw puppies`";
    }

};
