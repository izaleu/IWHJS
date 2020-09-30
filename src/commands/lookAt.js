const Command = require('../command');
const { q, p,s } = require('../utils');
const {
    getRoom
} = require('../dataManager');

module.exports = class lookAt extends Command {
    static get verb () {
        return 'look';
    }

    static get isAsync () {
        return true;
    }

    static isAvailable() {
        return true;
    }

    static async execute(currentState, optionalParams) {
        p("Here's what you see:");
        const {items} = getRoom(currentState.playerPos)
        items.forEach(item => {
            p(item.name);
        });
        p("What do you want to look at?");
        return q("Select an item").then(async input => {
           const result = items.find(item => item.name === input);
           if(result) {
               p("You look at the", result.name+":");
               await s(result.desc);
           } else {
               p("Sorry, I don't know what that is.");
           }
           return currentState;
        })
    }
}