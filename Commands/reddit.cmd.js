const Reddit = require('../Modules/Reddit.js');

module.exports = {
    rateLimit: 5000,

    subs : ["foodporn", "Cinemagraphs", "AbandonedPorn", "EarthPorn", "itookapicture"],

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        // Get sub name
        var sub = (msgArray.length <= 1)
          ? this.subs[Math.floor(Math.random()*this.subs.length)]
          : msgArray[1];

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
      return "Get a random image from the subreddit `!reddit foodporn`";
    }

};
