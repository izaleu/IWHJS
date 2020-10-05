const Command = require('../command');
const { q, p, n, s } = require('../utils');

module.exports = class setPlayerName extends Command {
    static get verb() {
        return 'name'
    }

    static get isAsync() {
        return true;
    }

    static isAvailable(currentState) {
        return true;
    }

    static async execute(currentState, optionalParams) {
        if (optionalParams === 'self') {
            return q('What would you like to be called? (Press enter to cancel.)').then(async input => {
                if (input === '') {
                    p('Never mind.');
                    return currentState;
                } else {
                    //Note: be presumptive, this is the reducer
                    await s(`Your name is now ${input}`);
                    return {
                        ...currentState, 
                        playerName: input
                    };
                }
            });
        } else if (optionalParams) {
            return q(`What would you like ${optionalParams} to be called? (Press enter to cancel.)`).then(input => {
                if (input === '') {
                    p('Never mind.');
                    return currentState;
                } else {
                    s(`${optionalParams} will now be called ${input} from now on.`);
                    n();
                    
                    //TODO: Apply user alias to valid object
                    //return Object.assign({}, currentState, { name: input });
                    return currentState;
                }
            });
        } else {
            p(`Your name is ${currentState.playerName}.`);
            return currentState;
        }

    }
}