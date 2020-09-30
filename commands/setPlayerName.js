const Command = require('../command');
const { q, p } = require('../utils');

module.exports = class setPlayerName extends Command {
    static get verb() {
        return 'name'
    }

    static get isAsync() {
        return true;
    }

    static isAvailable(currentState) {
        return currentState && !currentState.playerName;
    }

    static async execute(currentState, optionalParams) {
        return q('What would you like to be called?').then(input => {
            if(input === '' || input === 'q') {
                p('Never mind.');
                return currentState;
            } else {
                return Object.assign({}, currentState, { name: input });
            }
        });
    }
}