const readline = require('readline');
const Input = require('./component');

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
        throw new Error("Destroy component not implemented");
    }
    async update() {
        //sort components by active state
        //rendering should happen in a queue?
        return Promise.all(this.components.map(async component => {
            return this.getUserInput(component);
        }))
    }

    getComponents() {
        return this.components;
    }

    async getUserInput(component) {
        if (component.data.isActive) {
            component.data.isActive = false;
            //what do we do with the input?
            return question().then(result => {
                //dispatch event
                this.dispatcher.dispatch({
                    type: 'user_input',
                    payload: {
                        origin: component, text: result
                    }
                });
            });
        }
    }
}

function question(completerOptions = null) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        completer: completerOptions ? getCompleter(completerOptions) : null
    });

    let response;

    // rl.setPrompt(colorize(questionColor, q + '\n'));
    // rl.prompt();

    return new Promise((resolve) => {
        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
            // if(!userInput.endsWith('')) this.n();
            resolve(response);
        });
    });
}