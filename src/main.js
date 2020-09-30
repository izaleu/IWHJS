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

    await s("Hi there! Welcome to the alpha build of I Wasn/'t Here! Quit any time with CTRL-C.")

    // Game Intro
    await s(getRoom(gm.getCurrentState().playerPos).desc);

    // Game Loop
    while (gm.getCurrentState().running === true) {

        // List available commands
        const cmds = cm.getAvailableCommands();
        p('Things you can do here:');
        cmds.forEach(c => p(c.verb));
        n();

        await q('What do you do?').then(async (input) => {
            //TODO: Accept aliases for first character (or characters, if dupes) for commands
            const result = cmds.find(cmd => cmd.verb.toLowerCase() === input);
            if (result) {
                if (result.isAsync) {
                    await cm.dispatchAsync(result)
                } else {
                    cm.dispatch(result);
                }
            } else {
                p("Sorry, I didn't understand that.")
                n();
            }
        });
    }
}