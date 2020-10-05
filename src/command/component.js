module.exports = class Command {
    constructor(ID, entity, data = {input: ''}) {
        this.ID = ID;
        this.entity = entity;
        this.data = data;
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
           mode: 'user' // one of user or test?
           input: string
       }
        */
        return this.data;
    }
}