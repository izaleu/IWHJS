
class RendererSystem {
    constructor() {
        this.components = []
    }
    createComponent(entity, data) {
        const newID = this.components.length;
        this.components.push(new Renderer(newID, entity, data));
    }
    destroyComponent(ID) {
        throw new Error("Destroy component not implemented");
    }
   async update() {
        //sort components by active state
        //rendering should happen in a queue?
        this.components.forEach(async component => {
           await this.render(component);
        });
    }

   async render(component) {
        if(component.data.isActive) {
           await console.log(component.data.text);
            component.data.isActive = false;
        }
    }
}

class Renderer {
    constructor(ID, entity, data) {
        this.ID = ID;
        this.entity = entity;
        this.data = data
    }
    getID() {
        return this.ID;
    }
    getEntity() {
        return this.entity;
    }
    getData() {
        /*
        {
            text: "Hello World",
            isActive: true
        }
        */
        return this.data;
    }
}

class Entity {
    constructor(ID) {
        this.ID = ID;
    }
    getID() {
        return this.ID;
    }
}

class EntityManager {
    constructor() {
        this.entities = [];
    }
    createEntity() {
        const newID = this.entities.length;
        this.entities.push(new Entity(newID));
        return this.entities[this.entities.length-1];
    }
    destroyEntity() {
        throw new Error("Destroy entity not implemented");
    }
}

module.exports = async function main() {
    // Initialization

    // Game Intro

    // Game Loop
    const maxTurns = 3;
    let currentTurn = 0;

    const entityManager = new EntityManager();
    const rendererSystem = new RendererSystem();

    rendererSystem.createComponent(entityManager.createEntity(), {text: "Hello World!", isActive: true});

    while (currentTurn < maxTurns) {
        await update(rendererSystem);
        currentTurn++;
    }
}

async function update(rendererSystem) {
    await rendererSystem.update();
}
