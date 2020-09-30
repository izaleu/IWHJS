const {commands} = require('./commands');

module.exports = class CommandManager {
    constructor(gameManager){
        this.gameManager = gameManager;
        this.commands = commands;
    }

    getAvailableCommands () {
        return this.commands.filter(cmd => cmd.isAvailable(this.gameManager.getCurrentState()));
    }

    dispatch (command) {
        this.gameManager.applyCommand(command.execute);
    }

    async dispatchAsync (command) {
       await this.gameManager.applyAsyncCommand(command.execute);
    }
}