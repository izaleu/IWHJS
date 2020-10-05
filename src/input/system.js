const readline = require('readline');
const Input = require('./component');

// Note: this system should only ever have one instance of Input
module.exports = class InputSystem {
    constructor(dispatcher) {
        this.components = [];
        this.dispatcher = dispatcher;
    }

    createComponent(entity, data) {
        const newID = this.components.length;
        this.components.push(new Input(newID, entity, data));
    }
    destroyComponent(ID) {
        this.components = this.components.filter(comp => comp.ID !== ID);
    }
    async update() {
        return Promise.all(this.components.map(async component => {
            return this.getUserInput(component);
        }))
    }

    getComponents() {
        return this.components;
    }

    async getUserInput(component) {
        if (component.data.inputType === 'question') {
            //what do we do with the input?
            return question().then(result => {
                //dispatch event
                this.dispatcher.dispatch({
                    type: 'user_input',
                    payload: {
                        origin: component,
                        text: result
                    }
                });
            });
        } else {
            return acknowledge().then(() => {
                this.destroyComponent(component.ID);
            });
        }

    }
}

function question(completerOptions = null) {
    const rl = readline.createInterface({
        input: process.stdin,
        //  output: process.stdout,
        completer: completerOptions ? getCompleter(completerOptions) : null
    });
    return new Promise((resolve) => {
        rl.on('line', (userInput) => {
            let response = userInput;
            rl.close();
            // if(!userInput.endsWith('')) this.n();
            resolve(response);
        });
    });
}

function getCompleter(options) {
    const completions = options;
    // Completer fn
    return (line) => {
        let input = line.split(' ');
        const hits = completions.filter((c) => c.startsWith(input.slice(-1)));

        if ((input.length > 1) && (hits.length === 1)) {
            let lastCmd = input.slice(-1)[0];
            let pos = lastCmd.length;
            rl.line = line.slice(0, -pos).concat(hits[0]);
            rl.cursor = rl.line.length + 1;
        }

        return [hits.length ? hits.sort() : completions.sort(), line];
    }
}    

function acknowledge () {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.write("(Press any key to continue.)");

    return new Promise(async (resolve) => {
        rl.input.once("keypress", (c,key) => {
            var len = rl.line.length;
            readline.moveCursor(rl.output, -len, 0);
            readline.clearLine(rl.output, 1);
            rl.close();
            resolve();
        });
    })
}