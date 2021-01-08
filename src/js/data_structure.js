const ranks = new Map();
const hand = [0, 0, 0, 0, 0, 0];
let rank = 1;
let short_description;
let long_description;

class Rank {
    constructor(short_description, long_description) {
        this.rank = rank++;
        this.short_description = short_description;
        this.long_description = long_description + ' rank = ' + this.rank;
    }
}

function generateFiveKind() {
    const cards = 5;
    for (var i = hand.length - 1; i >= 0; i--) {
        hand[i] = cards;
        short_description = 'Five of ' + (i + 1);
        long_description = short_description + ' Nice hand :)';
        ranks.set(getHashCode(hand), new Rank(short_description, long_description));
        hand[i] = 0;
    }
}
function generateFourKind() {
    const cards = 4;
    const high_card = 1;
    for (var i = hand.length - 1; i >= 0; i--) {
        hand[i] = cards;
        for (var j = hand.length - 1; j >= 0; j--) {
            if (i === j) continue;
            hand[j] = high_card;
            short_description = 'Four of ' + (i + 1);
            long_description = short_description + ' High dice: ' + (j + 1);
            ranks.set(getHashCode(hand), new Rank(short_description, long_description));
            hand[j] = 0;
        }
        hand[i] = 0;
    }
}
function generateFullHouse() {
    const cardsThree = 3;
    const cardsPair = 2;
    for (var i = hand.length - 1; i >= 0; i--) {
        hand[i] = cardsThree;
        for (var j = hand.length - 1; j >= 0; j--) {
            if (i === j) continue;
            hand[j] = cardsPair;
            short_description = 'Full House, ' + (i + 1) + ' over ' + (j + 1);
            long_description = short_description + ' not bad...';
            ranks.set(getHashCode(hand), new Rank(short_description, long_description));
            hand[j] = 0;
        }
        hand[i] = 0;
    }
}

function generateStraight() {
    let temp_hand = [1, 1, 1, 1, 1, 1];
    temp_hand[0] = 0;
    short_description = 'Straight';
    long_description = 'Six High Straight';
    ranks.set(getHashCode(temp_hand), new Rank(short_description, long_description));
    temp_hand[0] = 1;
    temp_hand[5] = 0;
    long_description = 'Five High Straight';
    ranks.set(getHashCode(temp_hand), new Rank(short_description, long_description));
    temp_hand = null;
}

function generateThreeKind() {
    const cardsThree = 3;
    const cardHigh = 1;
    for (var i = hand.length - 1; i >= 0; i--) {
        hand[i] = cardsThree;
        for (var j = hand.length - 1; j >= 0; j--) {
            if (i === j) continue;
            hand[j] = cardHigh;
            for (var z = j - 1; z >= 0; z--) {
                if (z === j || z === i) continue;
                hand[z] = cardHigh;
                if (ranks.has(getHashCode(hand))) {
                    continue;
                }
                short_description = 'Three of ' + (i + 1);
                long_description = short_description + ' Lower dice: ' + (z + 1) + ' Higher dice: ' + (j + 1);
                ranks.set(getHashCode(hand), new Rank(short_description, long_description));
                hand[z] = 0;
            }
            hand[j] = 0;
        }
        hand[i] = 0;
    }
}

function generateTwoPairs() {
    const cardsPair = 2;
    const cardHigh = 1;
    for (var i = hand.length - 1; i >= 0; i--) {
        hand[i] = cardsPair;
        for (var j = hand.length - 1; j >= 0; j--) {
            if (i === j) continue;
            hand[j] = cardsPair;
            for (var z = hand.length - 1; z >= 0; z--) {
                if (z === j || z === i) continue;
                hand[z] = cardHigh;
                if (ranks.has(getHashCode(hand))) {
                    continue;
                }
                short_description = 'Two Pairs, ' + (i + 1) + ' and ' + (j + 1);
                long_description = short_description + ' High dice: ' + (z + 1);
                ranks.set(getHashCode(hand), new Rank(short_description, long_description));
                hand[z] = 0;
            }
            hand[j] = 0;
        }
        hand[i] = 0;
    }
}

function generateOnePair() {
    const cardsPair = 2;
    const higherCard = 1;
    for (var i = hand.length - 1; i >= 0; i--) {
        hand[i] = cardsPair;
        for (var j = hand.length - 1; j >= 0; j--) {
            if (j === i) continue;
            hand[j] = higherCard;
            for (var z = j - 1; z >= 0; z--) {
                if (z === i) continue;
                hand[z] = higherCard;;
                for (var l = z - 1; l >= 0; l--) {
                    if (l === i) continue;
                    hand[l] = higherCard;
                    if (ranks.has(getHashCode(hand))) {
                        continue;
                    }
                    short_description = 'One Pair of ' + (i + 1);
                    long_description = short_description + ' Highest dice: ' + (j + 1) + ' Middle dice: ' + (z + 1) + ' Lowest dice: ' + (l + 1);
                    ranks.set(getHashCode(hand), new Rank(short_description, long_description));
                    hand[l] = 0;
                }
                hand[z] = 0;
            }
            hand[j] = 0;
        }
        hand[i] = 0;
    }
}

function generateHighCard() {
    let hand = [1, 1, 1, 1, 1, 1];
    for (var i = 1; i < hand.length - 1; i++) {
        hand[i] = 0;
        short_description = 'Higher dice';
        long_description = 'bad luck :(';
        ranks.set(getHashCode(hand), new Rank(short_description, long_description));
        hand[i] = 1;
    }
}

function getHashCode(arr) {
    if (!arr) return null;
    var result = 1;
    for (const element of arr) {
        result = 31 * result + element;
    }
    return result;
}

(function generateRanks() {
    generateFiveKind();
    generateFourKind();
    generateFullHouse();
    generateStraight();
    generateThreeKind();
    generateTwoPairs();
    generateOnePair();
    generateHighCard();
})();

export const getRank = dice_hand => {
    return ranks.get(getHashCode(dice_hand));
}