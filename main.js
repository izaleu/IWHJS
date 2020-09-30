const { q, p } = require('./utils');
const GameManager = require('./gameManager');
const CommandManager = require('./commandManager');

async function main() {
    // Initialization
    let gm = new GameManager();
    let cm = new CommandManager(gm);
    
    process.on('SIGINT', () =>{
        process.exit();
    })

    // TODO: player onboarding

    // TODO: load/save/resume

    // Game Intro
    await q('You\'re in a hotel room. The walls are an ugly shade of green. Press any key to continue.');
    // await q('Here is some explainer text, press any key to continue').then(() => { 
    //     console.log('')
    // });

    p('initial state:');
    gm.print();

    // Game Loop
    while (gm.getCurrentState().running === true) {
        const cmds = cm.getAvailableCommands();
        p('Things you can do here:')
        cmds.forEach(c => console.log(c.verb))

        await q('What do you do?').then(async (input)=> {
           
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

        if(gm.getCurrentState().name) {
            p('your name is: '+gm.getCurrentState().name)
        }
    }
}

// TODO: Export main to another file and run it there
main();