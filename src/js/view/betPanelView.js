import { DOMelements } from './base';

let check = true;
export const toggleBetPanel = (bet_flag) => {
    DOMelements.betPanels['player_1'].classList.toggle('bet__active');
    DOMelements.betPanels['player_2'].classList.toggle('bet__active');
    if (bet_flag === 2) {
        DOMelements.btnsRaiseLower.forEach(btn => btn.style.visibility = 'hidden');
        DOMelements.btnsRaiseHigher.forEach(btn => btn.style.visibility = 'hidden');
    }
}
export const setCheck = () => {
    DOMelements.btnsCheck.forEach(btn => btn.classList.remove('btn__invisible'));
    DOMelements.btnsCall.forEach(btn => btn.classList.add('btn__invisible'));
    check = true;
}
export const setCall = () => {
    DOMelements.btnsCheck.forEach(btn => btn.classList.add('btn__invisible'));
    DOMelements.btnsCall.forEach(btn => btn.classList.remove('btn__invisible'));
    check = false;
}
export const initBetPhase = player => {
    DOMelements.betPanels[player].classList.add('bet__active');
};
export const setInvisible = () => {
    DOMelements.btnsRaiseLower.forEach(btn => btn.style.visibility = 'visible');
    DOMelements.btnsRaiseHigher.forEach(btn => btn.style.visibility = 'visible');
    DOMelements.betPanels['player_1'].classList.remove('bet__active');
    DOMelements.betPanels['player_2'].classList.remove('bet__active');
    setCheck();
};

export const setRaiseValues = chip => {
    DOMelements.btnsRaiseLower.forEach(btn => {
        btn.textContent = 2 * chip;
    });
    DOMelements.btnsRaiseHigher.forEach(btn => {
        btn.textContent = 4 * chip;
    });
};
export const isCheckActive = () => {
    return check;
}
window.check = isCheckActive;