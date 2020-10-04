# Notes

## Issues with current iteration
* Core interaction loop feels very brittle and limited. Question => command => reducer => new game state => question. (I guess this is the same for all games like this.)

* Parsing of user input not robust.
* GameManager emerging as monolith... desire for single source of state/truth is valid, but unsure how to create a rich, fully-serializable game Map.
* Data files can only provide initial and immutable state.
* I'm a little shaky on the nuances of async/await and Promise. Worried about getting into a microtask that can't bail without multiple applications of ctrl-C.
	
## Concerns with original design

* Lots of inheritence, could be inflexible when making changes later.

## Issues with both designs

* I would awfully like to isolate "rendering" from game logic.
* a11y - how do screen readers work with the binary produced by pkg? (On Windows, OSX, Linux?)
* a11y - How TF do you change the font size, colors?
* i18n - how to manage RTL languages
* testing - command automation seems limited by requiring user input... abstracting this would help

## TODO

 - [ ] Room connections, connection states, lock/unlock, aliases (eg., "north", "green door")
 - [ ] Player movement
 - [ ] Pick up and move objects
 - [ ] Save, load, delete
 - [ ] Read data from CSV
 - [ ] Re-implement everything in Python
 - [ ] Figure out font sizes

I am interested in trying an ECS approach.

I would like to implement optional sound.

