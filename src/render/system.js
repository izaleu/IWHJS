const readline = require('readline');
const Renderer = require('./component');

// Note: this system should only ever have one instance of Renderer (for now)
module.exports = class RendererSystem {
    constructor() {
        this.components = []
        this.reducer = this.reducer.bind(this);
    }
    createComponent(entity, data) {
        const newID = this.components.length;
        this.components.push(new Renderer(newID, entity, data));
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
        if (action.type === 'render') {
            this.components.forEach(component => {
                component.data.text = action.payload.text;
            })
        }
    }

    async update() {
        //sort components by active state
        //rendering should happen in a queue?
        //return Promise.all, map instead of foreach
        return Promise.all(this.components.map(async component => {
            return this.render(component).then(()=>{
                if(component.data.once) {
                    this.destroyComponent(component.ID)
                }
            });
        }));
    }

    async render(component) {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                output: process.stdout,
                input: process.stdin
            });
            rl.write(component.data.text);
            rl.write('\n');
            rl.close();
            resolve();
        })
    }
}