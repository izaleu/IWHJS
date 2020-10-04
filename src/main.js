const { q, p, s, n } = require('./utils');
const GameManager = require('./gameManager');
const CommandManager = require('./commandManager');
const { 
    getString,
    getItem,
    getKey,
    getRoom 
} = require('./dataManager');

module.exports = async function main() {
    // Initialization
    const gm = new GameManager();
    const cm = new CommandManager(gm);

    // TODO: player onboarding

    // TODO: load/save/resume

    await s("Hi there! Welcome to the alpha build of I Wasn't Here! Type 'help' for a list of commands. \
    \n Note: you must match complete words, but they can be case-insensitive. Tab autocompletes.")

    // Game Intro
    await s(getRoom(gm.getCurrentState().playerPos).desc);

    // Game Loop
    while (gm.getCurrentState().running === true) {
        await update(gm, cm);
    }
}

async function update(gm, cm) {
    const cmds = cm.getAvailableCommands();
        const completions = cmds.map(cmd => cmd.verb)
        await q('What do you do?', completions).then(async (input) => {
            //TODO: Accept aliases for first character (or characters, if dupes) for commands
            const result = cmds.find(cmd => cmd.verb.toLowerCase() === input);
            if (result) {
                if (result.isAsync) {
                    await cm.dispatchAsync(result)
                } else {
                    cm.dispatch(result);
                }
                n();
            } else {
                if(input !=='') n();
                p("Sorry, I didn't understand that.");
                n();
            }
        });
}