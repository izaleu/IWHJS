module.exports = class GameManager {
    constructor(){
        this.state = {
            running: true,
            settings: {},
            playerInventory: {},
            playerPos: [0,0]
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

    applyCommand (execute) {
        const currentState = this.getCurrentState();
        const newState = execute(currentState);
        this.prevState = currentState;
        this.state = newState;
    }

    async applyAsyncCommand (execute) {
        const currentState = this.getCurrentState();
        await execute(currentState).then(newState => {
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

    print () {
        console.log('gamestate:', this.state)
    }
}