const Prefixes = require('../Modules/Prefixes.js');

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

        // @TODO: Refactor so order of commands dont matter
        //   - Reference - fortnite.cmd.js
        switch (msgArray[1].toLowerCase()) {
          case "add":
              if (msgArray.length <= 2)
              {
                  msg.reply("Give me a prefix to work with!");
                  return;
              };
              Prefixes.add(msg.guild.name, msgArray[2]);
            break;

          case "remove":
              if (msgArray.length <= 2)
              {
                  msg.reply("Give me a prefix to work with!");
                  return;
              };
              Prefixes.remove(msg.guild.name, msgArray[2]);
            break;

          case "list":
              var prefixes = Prefixes.prefixes[msg.guild.name.toLowerCase()];
              msg.reply('Valid prefixes: `' + prefixes.join('  ') + '`');
            break;
        }
    },

    /**
     * What is display when a user enters !help (this command) in chat
     *
     * MUST RETURN A STRING
     */
    help: function (msg)
    {
      return "Manage Custom Prefixes for your server `!prefix [cmd]`\n Valid cmd's are \nadd\nremove\nlist";
    }

};
