module.exports = class Command {
    get verb() {
        return "_none";
    }

    get isAsync() {
        return false;
    }

    static isAvailable(currentState) {
        return false;
    }

    static execute(currentState, optionalParams) {
        //do something
        return currentState;
    }
}