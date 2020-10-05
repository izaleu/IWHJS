const { commands } = require('./commands');

function getCommandMap(commands) {
    let map = {};

    commands.forEach(cmd => {
        map[cmd.verb] = cmd;
    })

    return map;
}

module.exports = class CommandManager {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.commands = commands;
    }

    getAvailableCommands() {
        return this.commands.filter(cmd => cmd.isAvailable(this.gameManager.getCurrentState()));
    }

    get commandMap() {
        return getCommandMap(this.getAvailableCommands());
    }

    dispatch(command, commandArgs) {
        this.gameManager.applyCommand(command, commandArgs);
    }

    async dispatchAsync(command, commandArgs) {
        await this.gameManager.applyAsyncCommand(command, commandArgs);
    }
}