const EntityManager = require('./EntityManager');
const Dispatcher = require('./Dispatcher');
const CommandSystem = require('./command').system;

const RenderSystem = require('./render').system;
const InputSystem = require('./input').system;

//WARNING: A class with dispatch AND reducers can infinite loop!
module.exports = async function main() {
    // Initialization
    const entityManager = new EntityManager();
    const dispatcher = new Dispatcher();

    const renderSystem = new RenderSystem();
    const inputSystem = new InputSystem(dispatcher);
    const commandSystem = new CommandSystem(dispatcher);

    dispatcher.addListener(renderSystem.reducer);
    dispatcher.addListener(commandSystem.reducer);


    // Game Intro
    // TODO: replace with scripted layer
    // Note: self-destroying components
    renderSystem.createComponent(entityManager.createEntity(), { text: "Hello world!", once: true });
    inputSystem.createComponent(entityManager.createEntity(), { inputType: 'acknowledge' });

    // Manual update
    await renderSystem.update();
    await inputSystem.update();
    //End Intro

    // Set up main loop
    // Note: persistent components
    //create system/static entity
    const systemEntity = entityManager.createEntity();

    renderSystem.createComponent(systemEntity, { text: "What do you do?" });
    inputSystem.createComponent(systemEntity, { inputType: 'question' });
    commandSystem.createComponent(systemEntity);

    // Game Loop safeguard
    const maxTurns = 3;
    let currentTurn = 0;

    // Main game loop
    while (currentTurn < maxTurns) {

        await renderSystem.update();
        await inputSystem.update();
        await commandSystem.update();

        // update all other systems

        // clean up entities
        entityManager.update([renderSystem, inputSystem, commandSystem]);

        currentTurn++;
    }
}
