const fs = require('fs');
const Log = require('./Logging.js');

module.exports = {

    /**
     * Reads from file
     * 
     * @param path Path to files to read
     * @return array with lines of file
     * 
    */
    readFromFile: function (path)
    {
        if (!fs.existsSync(path))
        {
            Log.full('File', `Error reading file: ${path}`);
        }
        var readFile = fs.readFileSync(path, 'utf8');
        linesArray = readFile.split("\r\n");

        return linesArray;
    }


};