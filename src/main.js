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
    await s(getString(getRoom(gm.getCurrentState().playerPos).desc_id));

    // Game Loop
    while (gm.getCurrentState().running === true) {
        await update(gm, cm);
    }
}

async function update(gm, cm) {
    const cmds = cm.getAvailableCommands();
    const nouns = gm.getAvailableNouns(getRoom);
    const completions = cmds.map(cmd => cmd.verb);

    await q('What do you do?', completions).then(async (input) => {
        //TODO: Accept aliases for first character (or characters, if dupes) for commands

        if (isValidInput(input, cmds, nouns)) {

            const inputs = formatRawInput(input);
            const command = getCommandFromInput(inputs[0], cmds);
            const commandArgs = inputs.length > 1 ? inputs[1] : null;

            if (command.isAsync) {
                await cm.dispatchAsync(command, commandArgs);
            } else {
                cm.dispatch(command, commandArgs);
            }
            n();

        } else {
            expessConfusion(input);
        }
    });
}

function getCommandFromInput (input, cmds) {
    return cmds.find(cmd => cmd.verb === input);
}

function getNounFromInput (input, nouns) {
    return nouns.find(noun => noun === input)
}

// Splits, lowercases and replaces spaces in nouns with underscores
// eg., 'look Overnight Bag' => ['look', 'overnight_bag']
function formatRawInput (rawInput) {
    let spaceIndex = rawInput.indexOf(' ');
    return spaceIndex > -1 ? [
        rawInput.substring(0, spaceIndex).toLowerCase(),
        rawInput.substring(spaceIndex + 1).replace(' ', '_').toLowerCase() // TODO: make const cmd separator
    ] : 
    [rawInput];
}

 // TODO: noun alias support
function isValidInput(rawInput, cmds, nouns) {
    // TODO: check for valid syntax
    if(!rawInput) return false;

    const inputs = formatRawInput(rawInput);

    switch (inputs.length) {
        case 1: 
            const result = getCommandFromInput(inputs[0], cmds);
            return !!result;
        case 2:
            const verbResults = getCommandFromInput(inputs[0], cmds);
            const nounResults = getNounFromInput(inputs[1], nouns);
            return !!(verbResults && nounResults);
        default:
            return false;
    }
}

function expessConfusion(input) {
    if (input !== '') n();
    p("Sorry, I didn't understand that.");
    n();
}