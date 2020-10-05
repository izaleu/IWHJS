// Note: keeps a list of deltas between the initial map state and current
// Saves and loads to/from disk

// Note: flat object of rooms, keys are room ids
// this represents the initial game state
const rooms = require('../../data/rooms.json');

/*
Room schema

id: {
    name: string (nice name)
    desc_id: string id
    req_keys: array of key ids
    keys: array // move to items?
    items: array of item ids
    connections: array of connection
        id: {
            dir: string (describes relative position, eg "to the north")
            desc: string (describes appearance, should be desc_id)
            closed/open/locked? door object?
        }
}

Room delta schema (mutable fields only, obviously)

id: {
    keys
    items
    connections
}




*/