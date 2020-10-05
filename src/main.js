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

    // Note: self-destroying components
    renderSystem.createComponent(entityManager.createEntity(), { text: "Hello world!", once: true});
    inputSystem.createComponent(entityManager.createEntity(), {inputType: 'acknowledge'});

    await renderSystem.update();
    await inputSystem.update();
    //End Intro

    // Set up main loop
    renderSystem.createComponent(entityManager.createEntity(), { text: "What do you do?"});
    inputSystem.createComponent(entityManager.createEntity(), {inputType: 'question'});

    const systems = [renderSystem, inputSystem];
    
    // Main game loop
    while (currentTurn < maxTurns) {
        console.debug("Turn #"+(currentTurn+1));

        await Promise.all(systems.map(async sys => await sys.update()));

        entityManager.update(systems);
        currentTurn++;
    }
}
