const { R_OK } = require('constants');
const readline = require('readline');

// TODO: Wrap rl in singleton 
// TODO: Break out into input utils?
// TODO: Make commands?

// Question - Use this fn to get some input from the player and do something with it
// you can leave off the "then" to ignore the input
// example:
// q('what?').then(answer => console.log('I said:', answer));

exports.q = (q) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let response;

    rl.setPrompt(q + '\n');
    rl.prompt();

    return new Promise((resolve) => {
        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
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
    rl.write(q+" (Press any key to continue.)\n");

    return new Promise(async (resolve) => {
        rl.input.once("keypress", ()=> {
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
exports.p = (...args) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    args.forEach(arg => {
        rl.write(arg+" ")
    })
    rl.write('\n')
    rl.close();
}