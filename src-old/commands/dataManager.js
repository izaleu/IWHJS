// TODO: make this read from CSV and at least pretend to be performant (not loading everything at once)

// Note: This should return immutable data only!!!

const items = require('../data/items.json');
const keys = require('../data/keys.json');
const rooms = require('../data/rooms.json');
const strings = require('../data/strings.json');

function getString (id) {
    return strings[id];
}
function getItem (id) {
    return items[id];
}
function getKey (id) {
    return keys[id];
}
function getRoom (id) {
    return rooms[id];
}

function hydrateRoom (room) {
    return {
        ...room,
        desc: getString(room.desc_id),
        items: room.items.map(item => {
            return getItem(item);
        })
    }
}

module.exports = {
    getString,
    getItem,
    getKey,
    getRoom
}