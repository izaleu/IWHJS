module.exports = class Input {
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
