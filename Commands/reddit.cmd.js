const Reddit = require('../Modules/Reddit.js');

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
            msg.reply("Missing parameters");
            return;
        }

        // Get sub name
        var sub = msgArray[1];

        // Get random image
        Reddit.getRandomImage(sub, url => {
            msg.reply(url);
        }, msg);
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