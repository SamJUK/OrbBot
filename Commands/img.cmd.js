const Google = require('../Modules/Google.js');

module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

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
        if (["nsfw", "sfw", "all"].indexOf(msgArray[1].toLowerCase()) != -1 )
        {
            safeSearch = msgArray[1];
            if (msgArray.length <= 2)
            {
                msg.reply("Please give me a phrase to search");
                return;
            };
            phrase = msgArray[2];
        }else{
            phrase = msgArray[1];
        };

        Google.getRandomImage(phrase, urls => {
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

    }

};