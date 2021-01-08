import rollADie from 'roll-a-die';
import { DOMelements } from './base';

// export const updateDices = randomDices => {
//     const dices_on_table = DOMelements.dicesOnTable;
//     dices_on_table.forEach(dice => {
//         dice.classList.remove('dice__visible');
//     });
//     randomDices.forEach((dice_value, index) => {
//         dices_on_table[index].classList.add('dice__visible');
//         dices_on_table[index].setAttribute('src', `./img/dice-${dice_value}.png`);

//     });
// };
export const updateDices = (rollADie, randomDices) => {

    if (randomDices.length === 0) return;

    rollADie({
        numberOfDice: randomDices.length,
        callback: () => {
        },
        element: DOMelements.diceTable,
        values: randomDices,
        noSound: false
    });

};
export const updateDicesAlt = (rollADie, randomDices) => {
    rollADie({
        numberOfDice: randomDices.length,
        callback: () => {
        },
        element: DOMelements.diceTable,
        values: randomDices,
        delay: 4000,
        noSound: false
    });
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve();
    //     }, 1300);
    // });
}
// export const setTableVisibility = isVisible => {
//     (isVisible)
//         ? DOMelements.diceTable.classList.add('table__visible')
//         : DOMelements.diceTable.classList.remove('table__visible');
// }