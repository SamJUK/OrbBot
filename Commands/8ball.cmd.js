module.exports = {
    outcomes: [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ],

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        if (msgArray.length <= 1)
        {
            msg.reply("Gimme a question boii!");
            return;
        }

        msgArray.slice(0, 1);

        var question = msgArray.join(" ");

        var index = Math.round(Math.random()*this.outcomes.length);
        var outcome = this.outcomes[index];

        msg.reply("Magic 8ball says: " + outcome);
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "`!8ball Is 15 wrong?`";
    }

};
