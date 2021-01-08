export default class Table {
    constructor() {
        this.table = [];
    }
    getRandomDices(dices_to_roll = 5) {
        this.table = [];
        for (let i = 0; i < dices_to_roll; i++) {
            this.table.push(Math.floor(Math.random() * 6) + 1);
        }
        return this.table;
    }
}