/**
 * Roll a dice command
 * !rtd [Parameter1] [Parameter2]
 * 
 * @param Parameter1 | Int | How many dice to roll [Optional] (Defaults to 1)
 * @param Parameter2 | Int | How many sides each dice has [Optional] (Defaults to 6)   
 * 
 * @example !rtd | !rtd 2 | !rtd 2 8
 */

module.exports = {

    /**
     * What is run when someone enters this in chat 
     */
    run: function (msg)
    {
        var msgArray = msg.content.split(" ");

        // Get Dice Count
        var diceCount = 1;
        if (msgArray.length > 1 && !isNaN(msgArray[1]))
            diceCount = msgArray[1];

        // Get Dice Sides
        var diceSides = 6;
        if (msgArray.length > 2 && !isNaN(msgArray[2]))
            diceSides = msgArray[2];

        var dice = [];
        // While we still got dice to roll
        for (var i = 0; i<diceCount; i++)
        {
            // Roll the dice
            let die = Math.round(Math.random() * (diceSides - 1)) + 1;
            dice.push(die);
        };

        var diceString = "";
        var i = 1;
        dice.forEach(die=>{
            diceString += `**Dice ${i}:** ${die}\n`;
            i++;
        });

        msg.reply(`You haved rolled the following: \n${diceString}`);
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