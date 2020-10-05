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

    // Purge all empty entities
    // TODO: This is probably super slow and inefficient!
    update(systems) {
        const allIDs = systems.map(system => system.getComponents().reduce(component => component.entity.ID));
        this.entities = this.entities.filter(entity => allIDs.includes(entity.ID));
    }
}