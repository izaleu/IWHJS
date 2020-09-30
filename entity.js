module.exports = class Entity {
    constructor(id, components = []){
        this.id = id;
        this.components = components;
    }
    getID() {
        return this.id;
    }
    getComponent (componentName) {
        
    }
}