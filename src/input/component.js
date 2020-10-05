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
            input_type: string // one of: question, statement
            options: {
                completions: Array<string>
            }
        }
        */
        return this.data;
    }
}
