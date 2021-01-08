import { DOMelements } from './base';

export const toggleActivePlayer = () => {
    DOMelements.playerPanels['player_1'].classList.toggle('active');
    DOMelements.playerPanels['player_2'].classList.toggle('active');
};
export const updatePlayerCredits = (player, credits) => {
    DOMelements.playerCredits[player].textContent = `$${credits}`;
};
export const setPlayerName = (player, name) => {
    DOMelements.playerNames[player].textContent = name;
};
export const initGame = activePlayer => {
    DOMelements.playerNames['player_1'].classList.remove('winner');
    DOMelements.playerNames['player_2'].classList.remove('winner');
    DOMelements.playerPanels['player_1'].classList.remove('active');
    DOMelements.playerPanels['player_2'].classList.remove('active');
    DOMelements.playerPanels[activePlayer].classList.add('active');
};
export const setWinner = winner => {
    DOMelements.playerPanels['player_1'].classList.remove('active');
    DOMelements.playerPanels['player_2'].classList.remove('active');
    DOMelements.playerNames[winner].classList.add('winner');
};