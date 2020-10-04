

module.exports = class GameManager {
    constructor(){
        this.state = {
            running: true,
            settings: {}, // TODO: move to own class?
            playerInventory: [],
            playerPos: "000"
        } // TODO: replace with GameState class
        this.prevState = null;
    }

    getCurrentState(namespace) {
        if(!namespace) return this.state;
        return this.state[namespace];
    }

    setState (newState) {
        const currentState = this.getCurrentState();
        this.prevState.push(currentState);
        this.state = newState;
    }

    applyCommand (execute, commandArgs) {
        const currentState = this.getCurrentState();
        const newState = execute(currentState, commandArgs);
        this.prevState = currentState;
        this.state = newState;
    }

    async applyAsyncCommand (execute, commandArgs) {
        const currentState = this.getCurrentState();
        await execute(currentState, commandArgs).then(newState => {
            this.prevState = currentState;
            this.state = newState;
        });
    }

    undo () {
        if(this.prevState !== null) {
            this.state = this.prevState;
            this.prevState = null;
        }
    }

    // Note: includes playerInventory, current room inventory, and special global nouns (eg., self)
    getAvailableNouns(getRoom) {
        const {items, keys} = getRoom(this.state.playerPos);
        return [
            'self',
            ...this.state.playerInventory,
            ...items,
            ...keys
        ]
    }

    print () {
        console.log('gamestate:', this.state)
    }
}