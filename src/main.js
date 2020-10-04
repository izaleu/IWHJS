const readline = require('readline');

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
        if (component.data.isActive) {
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
        return this.entities[this.entities.length - 1];
    }
    destroyEntity() {
        throw new Error("Destroy entity not implemented");
    }
}

function question(completerOptions = null) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        completer: completerOptions ? getCompleter(completerOptions) : null
    });

    let response;

    // rl.setPrompt(colorize(questionColor, q + '\n'));
    // rl.prompt();

    return new Promise((resolve) => {
        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
            // if(!userInput.endsWith('')) this.n();
            resolve(response);
        });
    });
}

class InputSystem {
    constructor() {
        this.components = []
    }
    createComponent(entity, data) {
        const newID = this.components.length;
        this.components.push(new Input(newID, entity, data));
    }
    destroyComponent(ID) {
        throw new Error("Destroy component not implemented");
    }
    async update() {
        //sort components by active state
        //rendering should happen in a queue?
        return Promise.all(this.components.map(async component => {
            return this.getUserInput(component);
        }))
    }

    async getUserInput(component) {
        if (component.data.isActive) {
            component.data.isActive = false;
            //what do we do with the input?
            return question().then(result => {
                console.log("Finished entering text", result);
                //dispatch event
            });
        }
    }
}

class Input {
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
            options: {
                anyKeyContinue: boolean
                completions: Array<string>
            }
            isActive: true
        }
        */
        return this.data;
    }
}

module.exports = async function main() {
    // Initialization
    const entityManager = new EntityManager();

    const rendererSystem = new RendererSystem();
    const inputSystem = new InputSystem();
    // Game Intro

    // Game Loop
    const maxTurns = 3;
    let currentTurn = 0;

    rendererSystem.createComponent(entityManager.createEntity(), { text: "Hello World!", isActive: true });
    inputSystem.createComponent(entityManager.createEntity(), { isActive: true });

    while (currentTurn < maxTurns) {
        console.log("current turn", currentTurn)

        await update(rendererSystem);
        await update(inputSystem);
        currentTurn++;
    }
}

async function update(system) {
    await system.update();
}
