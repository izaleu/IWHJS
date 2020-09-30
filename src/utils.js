const readline = require('readline');

// TODO: Break out into input utils?
// TODO: Make commands?

// Question - Use this fn to get some input from the player and do something with it
// you can leave off the "then" to ignore the input
// example:
// q('what?').then(answer => console.log('you said:', answer));
exports.q = (q) => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    var response;

    rl.setPrompt(q + '\n');
    rl.prompt();

    return new Promise((resolve) => {
        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
        });

        rl.on('close', () => {
            resolve(response);
        });
    });
}

// Print
// Example:
// p('Some text!'); >>>> "Some Text!"
exports.p = (p) => {
    console.log(p);
}

