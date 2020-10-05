const Entity = require('./Entity');

module.exports = class EntityManager {
    constructor() {
        this.entities = [];
    }
    createEntity() {
        const newID = this.entities.length;
        this.entities.push(new Entity(newID));
        return this.entities[this.entities.length - 1];
    }
    destroyEntity() {
        throw new Error("Destroy entity not implemented");
    }
}