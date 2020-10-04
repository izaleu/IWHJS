const Command = require('../command');
const { q, p, s, n } = require('../utils');
const {
    getItem,
    getRoom,
    getString
} = require('../dataManager');

module.exports = class lookAt extends Command {
    static get verb() {
        return 'look';
    }

    static get isAsync() {
        return true;
    }

    static isAvailable() {
        return true;
    }

    // Note: If we are given optional args, describe that, else describe the current room
    static async execute(currentState, commandArgs) {
        n();
        if(commandArgs) {
            const item = getItem(commandArgs);
            p(`You look at the ${item.name}...`);
            await s(item.desc);
        } else {
            p('You look around...');
            //describe the room
            await s(getString(getRoom(currentState.playerPos).desc_id));
            //list all the things in the room
            p("Here's what you see:");
            const { items } = getRoom(currentState.playerPos);
            items.forEach(item => {
                p("* ", getItem(item).name);
            });
        }

        return currentState;
    }
}