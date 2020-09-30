const Command = require('../command');
const { p, n } = require('../utils');

module.exports = class helpCommand extends Command {
    static get verb() {
        return 'help'
    }

    static isAvailable(currentState) {
        return true
    }

    static execute(currentState, optionalParams) {
        n();
        p('List of commands:');
        p("- ", 'look');
        p("- ", 'name');
        p("- ", 'quit');
        n();
        p("Use CTRL-C to quit at any time.");
        n();

        return currentState;
    }
}