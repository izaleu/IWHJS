const Command = require('./command');
const { p, n } = require('./utils');

module.exports = class undoCommand extends Command {
    static get verb() {
        return 'undo'
    }

    static isAvailable(currentState) {
        // TODO: non-undoable commands
        return true
    }

    static execute(currentState, optionalParams) {
        return currentState;
    }
}