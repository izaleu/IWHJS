const Command = require('../command');

module.exports = class setPlayerName extends Command {
    static get verb () {
        return 'move';
    }
    static isAvailable(currentState) {
        return !currentState.playerPos; //player not restricted, there are valid places to go, etc
    }

    static execute(currentState, optionalParams) {
        return Object.assign({}, currentState, { playerPos: optionalParams });
    }
}