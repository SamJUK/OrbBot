const Cmds = require('../Modules/Commands.js');
const Aliases = require('../Modules/Aliases.js');
const Config = require('../Modules/Config.js');

module.exports = {

    run: function (msg)
    {
        // Split the message into an array
        var msgArray = msg.content.split(" ");
        var cmd = msgArray[1];

        // If there are less than 2 paramters return early
        if (msgArray.length < 2)
            return;

        // Check if its an alias
        if(Aliases.aliases[msg.guild.name.toLowerCase()].hasOwnProperty(cmd)){
          var tmp = Aliases.aliases[msg.guild.name.toLowerCase()][cmd];
          msg.reply(`The command is an alias of \`${tmp}\``);
          return;
        };

        // Check if its a bot alias
        if(Config.aliases.hasOwnProperty(cmd)){
          var tmp = Config.aliases[cmd];
          msg.reply(`The command is an alias of \`${tmp}\``);
          return;
        }

        // If the requested command does not exists return early
        if (Cmds.commands.indexOf(cmd) == -1){
          msg.reply('Command Does not exist');
          return;
        }

        var cmdIndex = Cmds.commands.indexOf(msg.content.split(" ")[1]);
        var helpString = Cmds.commandsModule[cmdIndex].help();

        if (helpString != "")
            msg.reply(helpString);
    },

    help: function (msg)
    {
        return "Help the help? Do u know de wey? `!help help`";
    }

};
