const main = require('./src/main');

// TODO: get this working again
// NodeJS event hook that allows us to terminate the program with ctrl-C
process.on('SIGINT', () =>{
    process.exit();
})

main();