import { DOMelements } from './base';

export const setDiceContainer = (hand, player) => {
    //player = 'player_1' | 'player_2'
    //hand = [2,6,5,2,1]
    DOMelements.diceContainers[player].forEach((dice, index) => {
        renderDice(dice, hand[index]);
    });
};
const renderDice = (dice, value) => {
    dice.setAttribute('src', `./img/dice-${value}.png`);
    dice.dataset.value = value;

    //UNDER CONSTRUCTION
    dice.style.visibility = 'visible';
};

export const updateDiceContainer = (rerolled_dices, player) => {
    DOMelements.diceContainers[player].forEach(dice => {
        if (dice.style.visibility === 'hidden') {
            toggleSelectedDice(dice, player);
            renderDice(dice, rerolled_dices.shift())
        }
    });
}

export const updateHandInfo = (player, rank_object) => {
    DOMelements.info[player].textContent = rank_object.short_description;
};
export const clearHandInfo = () => {
    DOMelements.info.player_1.textContent = '';
    DOMelements.info.player_2.textContent = '';
};

export const getSelectedDices = player => {
    const selected_dices = [];
    const position = (player === 'player_1') ? 'bottom' : 'top';
    DOMelements.diceContainers[player].forEach(dice => {
        if (dice.classList.contains(`dice__selected__${position}`)) {
            selected_dices.push(parseInt(dice.dataset.value));
            dice.style.visibility = 'hidden';
        }
    });
    return selected_dices;
};

export const toggleSelectedDice = (dice, player) => {
    const position = (player === 'player_1') ? 'bottom' : 'top';
    dice.classList.toggle(`dice__selected__${position}`);
    //check if there is any selected dice   
    const dices = DOMelements.diceContainers[player];
    for (let i = 0; i < dices.length; i++) {
        if (dices[i].classList.contains(`dice__selected__${position}`)) {
            return true;
        }
    }
    return false;
};

export const setInvisible = () => {
    DOMelements.diceContainers.player_1.forEach(dice => {
        dice.style.visibility = 'hidden';
    });
    DOMelements.diceContainers.player_2.forEach(dice => {
        dice.style.visibility = 'hidden';
    });
};

