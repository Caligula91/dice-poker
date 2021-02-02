import rollADie from 'roll-a-die';

import { getRank } from './data_structure';
import { DOMelements } from './view/base';
import Player from './model/Player';
import Table from './model/Table';
import Pot from './model/Pot';
import * as tableView from './view/tableView';
import * as diceContainerView from './view/diceContainerView';
import * as playerPanelView from './view/playerPanelView';
import * as potView from './view/potView';
import * as betPanelView from './view/betPanelView';
import * as rollBtnsView from './view/rollBtnsView';



/**
 * TODO
 * 1. flags closures
 * 2. implement btn 'New Game' and info about last players moves
 * 3. design better UI
 */

const state = {
    players: {
        player_1: new Player('player_1', 'Mihajlo', 100),
        player_2: new Player('player_2', 'Milos', 100),
        switchPlayers: () => {
            state.players.player_1.toggleActive();
            state.players.player_2.toggleActive();
        },
        getActivePlayer: () => (state.players.player_1.isActive) ? state.players.player_1 : state.players.player_2,
        getInactivePlayer: () => (state.players.player_1.isActive) ? state.players.player_2 : state.players.player_1,
        getReservedBets: () => state.players.player_1.getBet() + state.players.player_2.getBet(),
        getWinner: () => {
            const player_1_rank = state.players.player_1.getRank();
            const player_2_rank = state.players.player_2.getRank();
            let winner;
            if (player_1_rank < player_2_rank) {
                winner = 'player_1';
            } else if (player_1_rank > player_2_rank) {
                winner = 'player_2';
            }
            return winner;
        }
    },
    table: new Table(),
    pot: new Pot(),
    phase: undefined,
    chip: 5,
    flags: {
        roll_flag: false,
        bet_flag: 0
    },
}
window.state = state;

//TEST !!
DOMelements.btnNewGame.addEventListener('click', (e) => {
    if (state.phase === 'end') {
        initGame();
    }
});

const switchPlayers = () => {
    state.players.switchPlayers();
    playerPanelView.toggleActivePlayer();
    if (state.phase === 'bet') {
        //betPanelView.toggleBetPanel(toggleCallCheck, state.flags.bet_flag);
        betPanelView.toggleBetPanel(state.flags.bet_flag);
    } else if (state.phase === 'round_1' || state.phase === 'round_2') {
        rollBtnsView.setActive(state.players.getActivePlayer().getType());
    }
};


/**INIT PHASES */
const initBetPhase = () => {
    state.phase = 'bet';
    betPanelView.initBetPhase(state.players.getActivePlayer().getType());
    rollBtnsView.setInvisible();
}
const initRound2 = () => {
    state.phase = 'round_2';
    //restart roll flag
    state.flags.roll_flag = false;
    betPanelView.setInvisible();
    rollBtnsView.initRound(state.players.getActivePlayer().getType());
    //tableView.setTableVisibility(false);
    //set dice roll img to pass img
    rollBtnsView.setPassBtn();
};

/**
 * CONTROLL FINISH GAME
 */
const finishGame = winner => {
    //HANDLE SITUATION WHEN ONE PLAYER BET IIS HIGHER THAN OTHER !!!!!!!!!!!
    if (winner) {
        state.players[winner].addCredits(state.pot.getPot());
        playerPanelView.setWinner(winner);
        console.log(state.players[winner].getName() + ' WINNER!');
    } else {
        state.players.player_1.addCredits(state.players.player_1.getBet());
        state.players.player_2.addCredits(state.players.player_2.getBet());
        console.log('DRAW');
    }
    rollBtnsView.setInvisible();
    betPanelView.setInvisible();
    state.pot.clearPot();
    potView.updatePot(state.pot.getPot());
    playerPanelView.updatePlayerCredits('player_1', state.players.player_1.getCredits());
    playerPanelView.updatePlayerCredits('player_2', state.players.player_2.getCredits());
    DOMelements.btnNewGame.classList.remove('disabled');
    state.phase = 'end';
};

/**
 * CONTROLL ROLL BUTTONS
 */
const controllRoll = async () => {
    //ROBUST CODE, CLEANER MUST BE!
    //tableView.setTableVisibility(true);
    rollBtnsView.setInvisible();
    const player = state.players.getActivePlayer().getType();
    let dices_to_reRoll;
    if (state.phase === 'round_2') {
        // gets array of dice values for rerolling
        dices_to_reRoll = diceContainerView.getSelectedDices(player);
        state.players[player].removeDices(dices_to_reRoll);
        //reset roll -> pass btn
        rollBtnsView.setPassBtn();
    }
    const randomDices = state.table.getRandomDices((dices_to_reRoll) ? dices_to_reRoll.length : undefined);
    state.players[player].addDices(randomDices);
    const rank = getRank(state.players[player].hand);
    state.players[player].setRank(rank.rank);
    //insert here randomADie !
    //tableView.updateDices(randomDices);
    if (randomDices.length > 0) {
        tableView.updateDicesAlt(rollADie, randomDices);
        await new Promise(reslove => {
            setTimeout(() => {
                reslove();
            }, 1300);
        });
    }
    diceContainerView.updateHandInfo(player, rank);
    if (state.phase === 'round_1') {
        diceContainerView.setDiceContainer(randomDices, player);
    } else if (state.phase === 'round_2') {
        diceContainerView.updateDiceContainer(randomDices, player);
    }
    switchPlayers();
    if (state.flags.roll_flag) {
        if (state.phase === 'round_1') {
            initBetPhase();
        } else if (state.phase === 'round_2') {
            const winner = state.players.getWinner();
            finishGame(winner);
        }
    } else {
        state.flags.roll_flag = true;
    }
};
Object.values(DOMelements.btnsRoll).forEach(btn => {
    btn.addEventListener('click', controllRoll);
});

/**
 * CONTROLL SELECTING DICES
 */
DOMelements.diceContainers.player_1.forEach(dice => {
    dice.addEventListener('click', event => {
        controllSelectingDice(event.target, 'player_1');
    });
});
DOMelements.diceContainers.player_2.forEach(dice => {
    dice.addEventListener('click', event => {
        controllSelectingDice(event.target, 'player_2');
    });
});
const controllSelectingDice = (dice, player) => {
    const activePlayer = state.players.getActivePlayer().getType();
    if (state.phase === 'round_2' && activePlayer === player) {
        const selected = diceContainerView.toggleSelectedDice(dice, player);
        (selected) ? rollBtnsView.setRollBtn() : rollBtnsView.setPassBtn();
    }
};

/**
 * CONTROLL CHECK BUTTON
 */
DOMelements.btnsCall.forEach(btn => btn.addEventListener('click', () => {
    controllCheckCall('CALL');
}));
DOMelements.btnsCheck.forEach(btn => btn.addEventListener('click', () => {
    controllCheckCall('CHECK');
}));
DOMelements.btnsCall.forEach(btn => btn.addEventListener('keypress', event => {
    event.preventDefault();
}));
DOMelements.btnsCheck.forEach(btn => btn.addEventListener('keypress', event => {
    event.preventDefault();
}));
const controllCheckCall = type => {
    switch (type) {
        case ('CHECK'): {
            switchPlayers();
            (state.flags.bet_flag) ? initRound2() : state.flags.bet_flag++;
            break;
        }
        case ('CALL'): {
            //1. Raise bet to be equal as oposite Players bet
            const activePlayer = state.players.getActivePlayer();
            const inactivePlayer = state.players.getInactivePlayer();
            let bet = inactivePlayer.getBet() - activePlayer.getBet();
            //if player doesnt have sufficient credits to call, then calling is equal to remaining credits that he has
            //mora da se vrati ova razlika sto nije imao!!!
            if (!activePlayer.addBet(bet)) {
                bet = activePlayer.getCredits();
                activePlayer.addBet(bet);
                //make it equal
                inactivePlayer.addCredits(inactivePlayer.getBet() - activePlayer.getBet());
                inactivePlayer.bet = activePlayer.getBet();
                state.pot.value = state.players.getReservedBets();
                playerPanelView.updatePlayerCredits(inactivePlayer.getType(), inactivePlayer.getCredits());
            } else {
                state.pot.addValue(bet);
            }
            playerPanelView.updatePlayerCredits(activePlayer.getType(), activePlayer.getCredits());
            potView.updatePot(state.pot.getPot());
            if (state.flags.bet_flag === 1) {
                switchPlayers();
            }
            betPanelView.setCheck();
            initRound2();
            break;
        }
    }
};

/**
 * CONTROLL RAISE
 */
DOMelements.btnsRaiseLower.forEach(btn => btn.addEventListener('click', () => {
    controllRaise(parseInt(2 * state.chip));
}));
DOMelements.btnsRaiseHigher.forEach(btn => btn.addEventListener('click', () => {
    controllRaise(parseInt(4 * state.chip));
}));
DOMelements.btnsRaiseLower.forEach(btn => btn.addEventListener('keypress', event => {
    event.preventDefault();
}));
DOMelements.btnsRaiseHigher.forEach(btn => btn.addEventListener('keypress', event => {
    event.preventDefault();
}));

const controllRaise = raise => {
    const activePlayer = state.players.getActivePlayer();
    const inactivePlayer = state.players.getInactivePlayer();
    //1. Add bets to Player and Pot
    let bet = raise;
    if (activePlayer.getBet() < inactivePlayer.getBet()) {
        bet += (inactivePlayer.getBet() - activePlayer.getBet());
    }
    if (!activePlayer.addBet(bet)) {
        alert('Inssuficient funds');
        return;
    }

    state.pot.addValue(bet);
    //2. Update UI with new bets
    playerPanelView.updatePlayerCredits(activePlayer.getType(), activePlayer.getCredits());
    potView.updatePot(state.pot.getPot());
    //3. switch active player and change UI accordingly
    betPanelView.setCall();
    state.flags.bet_flag++;
    switchPlayers();
};

/**
 * CONTROLL FOLD
 */
DOMelements.btnsFold.forEach(btn => btn.addEventListener('click', () => {
    const winner = state.players.getInactivePlayer().getType();
    finishGame(winner);
}));
DOMelements.btnsFold.forEach(btn => btn.addEventListener('keypress', event => {
    event.preventDefault();
}));

//q - call / check  w - raiseLow  e - raiseHigh  f - fold  r - roll 1, 2, 3, 4, 5 - slecting dice
document.addEventListener('keypress', event => {
    switch (event.key) {
        case ('f'): {
            if (state.phase === 'bet') {
                const winner = state.players.getInactivePlayer().getType();
                finishGame(winner);
            }
            break;
        }
        case ('q'): {
            if (state.phase === 'bet') {
                controllCheckCall((betPanelView.isCheckActive()) ? 'CHECK' : 'CALL');
            }
            break;
        }
        case ('w'): {
            if (state.phase === 'bet' && state.flags.bet_flag !== 2) {
                controllRaise(parseInt(2 * state.chip));
            }
            break;
        }
        case ('e'): {
            if (state.phase === 'bet' && state.flags.bet_flag !== 2) {
                controllRaise(parseInt(4 * state.chip));
            }
            break;
        }
        case ('r'): {
            if (state.phase === 'round_1' || state.phase === 'round_2') {
                controllRoll();
            }
            break;
        }
        //MAKE IT CLEANER
        default: {
            if (!state.phase === 'round_2') {
                break;
            }
            const dice = document.getElementById(`dice-${event.key}-${(state.players.getActivePlayer().getType() === 'player_1') ? 'bottom' : 'top'}`);
            if (dice) {
                controllSelectingDice(dice, state.players.getActivePlayer().getType());
            }
        }
    }
});

/**
 * INIT APP
 */
const initGame = () => {
    DOMelements.btnNewGame.classList.add('disabled');
    diceContainerView.setInvisible();
    //determine who plays first
    state.players.player_1.isActive = true;
    state.players.player_2.isActive = false;
    const activePlayer = state.players.getActivePlayer();
    //init phase and chip
    state.phase = 'round_1';
    state.chip = 5;
    //restart flags
    state.flags.roll_flag = false;
    state.flags.bet_flag = 0;
    //restart Players hands (including players rank)
    state.players.player_1.resetHand();
    state.players.player_2.resetHand();
    //restarts Players reservedBet
    state.players.player_1.resetBet();
    state.players.player_2.resetBet();
    // //restart Pot ====> restarting in finish game()
    // state.pot.clearPot();
    // potView.updatePot(state.pot.getPot());
    //reset dice info and rank
    diceContainerView.clearHandInfo();
    if (!state.players.player_1.addBet(state.chip)) {
        alert(state.players.player_1.getName() + ' doesnt have enough credits :(');
        return;
    }
    if (!state.players.player_2.addBet(state.chip)) {
        alert(state.players.player_2.getName() + ' doesnt have enough credits :(');
        return;
    }

    //betPanelView.setRaiseValues(state.chip); //DELETE LATER FROM betPanelView !!!!!!!!!!
    rollBtnsView.initRound(activePlayer.getType());
    rollBtnsView.setRollBtn();
    betPanelView.setInvisible();
    playerPanelView.initGame(activePlayer.getType());
    //tableView.setTableVisibility(false);

    playerPanelView.setPlayerName('player_1', state.players.player_1.name);
    playerPanelView.setPlayerName('player_2', state.players.player_2.name);

    state.pot.addValue(state.players.getReservedBets());
    potView.updatePot(state.pot.getPot());
    playerPanelView.updatePlayerCredits('player_1', state.players.player_1.getCredits());
    playerPanelView.updatePlayerCredits('player_2', state.players.player_2.getCredits());
};
initGame();




