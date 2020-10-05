const Command = require('../command');

module.exports = class quitGame extends Command {
    static get verb () {
        return 'quit' // todo: add alias?
    }

    static isAvailable() {
        return true;
    }

    static execute(currentState) {
        return Object.assign({}, currentState, { running: false });
    }
}