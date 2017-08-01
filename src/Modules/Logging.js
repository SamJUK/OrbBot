const fs = require('fs-extra')

module.exports = {

    /**
     * Log a string to console
     * 
     * @param string Text What to log
     * @param Filepath | Full pile path e.g /servers/SamJ/Chat
     */
    console: function (text, logPath)
    {
        var stringPrefix = this.getCurrentTimeStamp() + " | ";

        var logPathArray = logPath.split("/");
        var logType = logPathArray[logPathArray.length-1];

        console.log(stringPrefix + logType + " | " + text);
    },

    /**
     * Append to log file
     * 
     * @param string Log to append to
     * @param string What to log 
     */
    file: function (string, logName)
    {
        var logPath = `./Logs/${logName.toLowerCase()}.log`;
        string = this.getCurrentTimeStamp() + " | "  + string;

        // Create file if it does not exist
        fs.stat(logPath, (err, stat) => {
            // File does not exists
            if (err != null)
            {
                if (err.code == 'ENOENT') {
                    fs.ensureFileSync(logPath);
                    fs.appendFileSync(logPath, `File Created: ${this.getCurrentTimeStamp()}\r\n\r\n`);
                } else {
                    this.console(`Some error occured with creating a log file (${logPath}): ${err.code}`);
                };
            };

            // Write our stuff to the file
            fs.appendFile(logPath, string + '\r\n', 'utf8', (err) => {
                if (err != null)
                    console.log(`An error occured while writing to file (${logPath}): ${err.code}`);
            });
        });
    },

    /**
     * Log to file and console
     * 
     * @param string Log to file to log to
     * @param string String What to log
    */
    full: function (logName, string)
    {
        this.console(string, logName);
        this.file(string, logName);
    },

    getCurrentTimeStamp: function ()
    {
        var d = new Date();

        // Date
        var day = this.padNumbers(d.getDate());
        var month = this.padNumbers(d.getMonth());
        var year = d.getFullYear();
        var date = `${day}/${month}/${year}`;

        // Time
        var hour = this.padNumbers(d.getHours());
        var min = this.padNumbers(d.getMinutes());
        var sec = this.padNumbers(d.getSeconds());

        var time = `${hour}:${min}:${sec}`;

        return `${time} ${date}`;
    },

    padNumbers: function (num)
    {
        return (num < 10) ? ("0" + num.toString()) : num.toString();
    }

};