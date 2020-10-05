const Renderer = require('./component');

module.exports = class RendererSystem {
    constructor() {
        this.components = []
        this.reducer = this.reducer.bind(this);
    }
    createComponent(entity, data) {
        const newID = this.components.length;
        this.components.push(new Renderer(newID, entity, data));
    }
    destroyComponent(ID) {
        throw new Error("Destroy component not implemented");
    }

    getComponents() {
        return this.components;
    }

    // Not really a reducer :/
    reducer(action) {
        // apply action to all components
        if (action.type === 'user_input') {
            this.components.forEach(component => {
                component.data.text = action.payload.text;
                component.data.isActive = true;
            })
        }
    }

    async update() {
        //sort components by active state
        //rendering should happen in a queue?
        this.components.forEach(async component => {
            await this.render(component);
        });
    }

    async render(component) {
        if (component.data.isActive) {
            await console.log('rendering', component.data.text);
            component.data.isActive = false;
        }
    }
}