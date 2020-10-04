const initialState = {
    running: true,
    settings: {}, // TODO: move to own class?
    playerInventory: [],
    playerPos: "000",
    playerName: "Alex"
};

module.exports = class GameManager {
    constructor(){
        this.history = [initialState]; // TODO: limit max history
    }

    getCurrentState(namespace) {
        if(!namespace) return this.history[this.history.length-1];
        return this.history[this.history.length-1][namespace];
    }

    applyCommand (command, commandArgs) {
        if(command.verb === 'undo') {
            this.undo();
        } else {
            const currentState = this.getCurrentState();
            const newState = command.execute(currentState, commandArgs);
            this.updateHistory(newState);
        }
    }

    async applyAsyncCommand ({execute}, commandArgs) {
        const currentState = this.getCurrentState();
        await execute(currentState, commandArgs).then(newState => {
            this.updateHistory(newState);
        });
    }

    updateHistory (state) {
        if(state !== this.history[this.history.length-1]) {
            this.history.push(state);
        }
    }

    // TODO: add confirm
    undo () {
        if(this.history.length) {
            this.history.pop();
        }
    }

    // Note: includes playerInventory, current room inventory, and special global nouns (eg., self)
    getAvailableNouns(getRoom) {
        const state = this.getCurrentState();
        const {items, keys} = getRoom(state.playerPos);
        return [
            'self',
            ...state.playerInventory,
            ...items,
            ...keys
        ]
    }

    print () {
        console.debug('>>>>>');
        console.debug('history:', this.history);
        console.debug('<<<<<');
    }
}