module.exports = class Renderer {
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
            once: false
        }
        */
        return this.data;
    }
}