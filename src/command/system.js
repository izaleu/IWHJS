const Command = require('./component');

// Note: this system should only ever have one instance of Command
// Redirects input from input manager to the appropriate place
module.exports = class CommandSystem {
    constructor(dispatcher) {
        this.components = []
        this.reducer = this.reducer.bind(this);
        this.dispatcher = dispatcher;

    }
    createComponent(entity, data) {
        const newID = this.components.length;
        this.components.push(new Command(newID, entity, data));
    }

    //TODO: Not called
    destroyComponent(ID) {
        this.components = this.components.filter(comp => comp.ID !== ID);
    }

    getComponents() {
        return this.components;
    }

    // Not really a reducer :/
    reducer(action) {
        // apply action to all components
        if (action.type === 'user_input') {
            this.components.forEach(component => {
                component.data.input = action.payload.text;
            })
        }
    }

    async update() {
        //sort components by active state
        return Promise.all(this.components.map(async component => {
            return this.validate(component).then(async isValid => {
                    if (isValid) {
                        //dispatch
                        console.log("dispatch command");
                    } else {
                        //express confusion
                        console.log("express confusion");

                        this.dispatcher.dispatch({
                            type: "render",
                            payload: {
                                text: "Sorry, I didn\'t understand \"" + component.data.input + "\""
                            }
                        });
                    }
                });
        }))
    }

    async validate(component) {
        return new Promise((resolve) => {
            let result;
            if (component.data.input.length) {
                //validate against all known commands
                result = true;
            } else {
                result = false;
            }
            resolve(result);
        })
    }
}