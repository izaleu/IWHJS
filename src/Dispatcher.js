module.exports = class Dispatcher {
    constructor() {
        this.listeners = [];
    }
    dispatch(message) {
        this.listeners.forEach(listener => {
            listener(message);
        });
    }
    addListener(listener) {
        this.listeners.push(listener);
    }

    // Unused, no destructors in ES6?
    removeListener(targetListener) {
        this.listeners = this.listeners.filter(listener => listener === targetListener);
    }
}