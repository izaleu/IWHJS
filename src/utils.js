const readline = require('readline');
const { statementColor, questionColor, printColor, ResetColor } = require('./consts');

// TODO: make more MUD-like
// TODO: print list of things
// TODO: select/choose from list

// TODO: Wrap rl in singleton 
// TODO: Break out into input utils?
// TODO: Make commands?

// Question - Use this fn to get some input from the player and do something with it
// you can leave off the "then" to ignore the input
// example:
// q('what?').then(answer => console.log('I said:', answer));

function colorize(color, ...args) {
    return color + args + ResetColor;
}

exports.q = (q) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let response;

    rl.setPrompt(colorize(questionColor, q + '\n'));
    rl.prompt();

    return new Promise((resolve) => {
        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
            this.n()
            resolve(response);
        });
    });
}


// Statement
// Prints a statement and bails on keypress
// TODO: optional time delay?
exports.s = (q) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.write(colorize(statementColor, q + " (Press any key to continue.)\n"));

    return new Promise(async (resolve) => {
        rl.input.once("keypress", () => {
            var len = rl.line.length;
            readline.moveCursor(rl.output, -len, 0);
            readline.clearLine(rl.output, 1);
            rl.close();
            resolve('quit');
        });
    })
}

// Print
// Example:
// p('Some text!'+foo); >>>> "Some Text! bar"
// TODO: override color?
exports.p = (...args) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    args.forEach(arg => {
        rl.write(colorize(printColor, arg + ' '));
    })
    rl.write('\n')
    rl.close();
}

// Prints a newline
exports.n = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.write('\n')
    rl.close();
}


