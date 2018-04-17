const Aliases = require('../Modules/Aliases.js');

module.exports = {

    /**
     * What is run when someone enters this in chat
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        // Missing Parameter
        if (msgArray.length <= 1)
        {
            msg.reply('Missing parameters dumb dumb');
            return;
        }

        switch (msgArray[1].toLowerCase()) {
          case "add":
            if (msgArray.length <= 3) {
                msg.reply("Please use the following format\n`!alias add [new command] [command to alias]`\n`!alias add new_ping ping`");
                return;
            };
            Aliases.add(msg.guild.name, msgArray[2], msgArray[3]);
          return;

          case "remove":
            if (msgArray.length <= 2) {
                msg.reply("Please use the following format\n`!alias remove [alias name]`\n`!alias remove new_ping`");
                return;
            };
            Aliases.remove(msg.guild.name, msgArray[2]);
          return;

          case "list":
            var aliases = Aliases.aliases[msg.guild.name.toLowerCase()];
            var a = '';

            for(var idx in aliases)
              a += `${idx}: ${aliases[idx]}\n`;

            msg.reply(`Current Aliases are \n\`\`\`${a}\`\`\``);
          return;

        }
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "Manage Aliases for commands\n `!alias [cmd] [params]`\n cmds - \n\tadd\n\tremove\n\tlist";
    }

};
