const { q, p, s } = require('./utils');
const GameManager = require('./gameManager');
const CommandManager = require('./commandManager');

module.exports = async function main() {
    // Initialization
    const gm = new GameManager();
    const cm = new CommandManager(gm);

    // TODO: player onboarding

    // TODO: load/save/resume

    // Game Intro
    await s('You\'re in a hotel room. The walls are an ugly shade of green. Press any key to continue.');

    // Game Loop
    while (gm.getCurrentState().running === true) {
        const cmds = cm.getAvailableCommands();
        p('Things you can do here:')
        cmds.forEach(c => console.log(c.verb))

        await q('What do you do?').then(async (input)=> {
           
            //TODO: Accept aliases for first character (or characters, if dupes) for commands
            const result = cmds.find(cmd => cmd.verb === input);
            if(result) { 
                if(result.isAsync) {
                    await cm.dispatchAsync(result)
                } else {
                    cm.dispatch(result);
                }
            } else {
                p("Sorry, I didn't understand that.")
            }
        });
    }
}