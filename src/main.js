const EntityManager = require('./EntityManager');
const Dispatcher = require('./Dispatcher');

const RenderSystem = require('./render').system;
const InputSystem = require('./input').system;

//WARNING: A class with dispatch AND reducers can infinite loop!
module.exports = async function main() {
    // Initialization
    const entityManager = new EntityManager();
    const dispatcher = new Dispatcher();

    const renderSystem = new RenderSystem();
    const inputSystem = new InputSystem(dispatcher);

    dispatcher.addListener(renderSystem.reducer);

    // Game Loop safeguard
    const maxTurns = 3;
    let currentTurn = 0;

    // Game Intro
    renderSystem.createComponent(entityManager.createEntity(), { text: "Welcome to the framework!", isActive: true });
    inputSystem.createComponent(entityManager.createEntity(), { isActive: true });

    // Game loop
    while (currentTurn < maxTurns) {
        console.log("current turn", currentTurn)

        await update(renderSystem);
        await update(inputSystem);
        // what things deserve to be components? What things deserve to be systems?
        currentTurn++;
    }
}

async function update(system) {
    await system.update();
}
