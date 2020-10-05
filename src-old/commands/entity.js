module.exports = class Entity {
    constructor(id, components = []){
        this.id = id;
        this.components = components;
    }
    get id() {
        return this.id;
    }
    getComponent (componentName) {
        
    }
}