export default class Pot {
    constructor() {
        this.value = 0;
    }
    addValue(value) {
        this.value += value;
    }
    clearPot() {
        this.value = 0;
    }
    getPot() {
        return this.value;
    }
}