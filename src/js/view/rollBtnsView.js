import { DOMelements } from './base';

// export const toggleRollBtns = () => {
//     DOMelements.btnsRoll['player_1'].classList.toggle('roll__active');
//     DOMelements.btnsRoll['player_2'].classList.toggle('roll__active');
// };

export const initRound = activePlayer => {
    Object.values(DOMelements.btnsRoll).forEach(btn => {
        btn.classList.remove('roll__active');
    });
    DOMelements.btnsRoll[activePlayer].classList.add('roll__active');
};

export const setInvisible = () => {
    DOMelements.btnsRoll['player_1'].classList.remove('roll__active');
    DOMelements.btnsRoll['player_2'].classList.remove('roll__active');
};
export const setPassBtn = () => {
    DOMelements.btnsRoll.player_1.firstElementChild.setAttribute('src', './img/btn_pass.png');
    DOMelements.btnsRoll.player_2.firstElementChild.setAttribute('src', './img/btn_pass.png');
};
export const setRollBtn = () => {
    DOMelements.btnsRoll.player_1.firstElementChild.setAttribute('src', './img/btn_roll.png');
    DOMelements.btnsRoll.player_2.firstElementChild.setAttribute('src', './img/btn_roll.png');
};
export const setActive = player => {
    DOMelements.btnsRoll[player].classList.add('roll__active');
};