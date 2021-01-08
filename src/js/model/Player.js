export default class Player {
    constructor(player, name, credits, playingFirst) {
        this.type = player;
        this.name = name;
        this.hand = [0, 0, 0, 0, 0, 0];
        this.credits = credits;
        this.bet = 0;
        this.isActive = playingFirst;
        this.bet = 0;
        this.handRank = -1;
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    toggleActive() {
        this.isActive = !this.isActive;
    }
    getHand() {
        return this.hand;
    }
    getRank() {
        return this.handRank;
    }
    resetHand() {
        //table is in array of dices e.g. [5, 6, 1, 6, 6];

        //restart hand to all zeros
        for (let i = 0; i < this.hand.length; i++) {
            this.hand[i] = 0;
        }
        this.handRank = -1;

        //update hand
        // table.forEach(dice => {
        //     this.hand[dice - 1]++;
        // });
    }
    removeDices(dices) {
        dices.forEach(dice_value => {
            this.hand[dice_value - 1]--;
        });
    }
    addDices(dices) {
        dices.forEach(dice_value => {
            this.hand[dice_value - 1]++;
        });
    }
    setRank(rank) {
        this.handRank = rank;
    }
    // return true if player has suficient credits
    addBet(value) {
        if (this.credits >= value) {
            this.credits -= value;
            this.bet += value;
            return true;
        } else {
            return false;
        }
    }
    getBet() {
        return this.bet;
    }
    addCredits(value) {
        this.credits += value;
    }
    getCredits() {
        return this.credits;
    }
    resetBet() {
        this.bet = 0;
    }
}