import { DOMelements } from './base';

export const updatePot = (pot_total) => {
    DOMelements.pot.textContent = `$${pot_total}`;
}