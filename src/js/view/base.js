export const DOMelements = {
    btnsRoll: {
        player_1: document.querySelector('.btn__roll__bottom'),
        player_2: document.querySelector('.btn__roll__top')
    },
    betPanels: {
        player_1: document.querySelector('.bet__panel__bottom'),
        player_2: document.querySelector('.bet__panel__top')
    },

    diceTable: document.querySelector('.dice__table'),
    dicesOnTable: document.querySelectorAll('.dice__on__table'),

    diceContainers: {
        player_1: document.querySelectorAll('.dice__bottom'),
        player_2: document.querySelectorAll('.dice__top')
    },
    info: {
        player_1: document.querySelector('.info__rank__bottom'),
        player_2: document.querySelector('.info__rank__top')
    },
    playerPanels: {
        player_1: document.querySelector('.bottom__panel'),
        player_2: document.querySelector('.top__panel')
    },
    playerNames: {
        player_1: document.querySelector('.player_1__name'),
        player_2: document.querySelector('.player_2__name')
    },
    playerCredits: {
        player_1: document.querySelector('.player_1__credits'),
        player_2: document.querySelector('.player_2__credits')
    },
    pot: document.querySelector('.pot'),
    btnsCheck: document.querySelectorAll('.btn__check'),
    btnsRaiseLower: document.querySelectorAll('.btn__raise__lower'),
    btnsRaiseHigher: document.querySelectorAll('.btn__raise__higher'),
    btnsFold: document.querySelectorAll('.btn__fold'),
    btnsCall: document.querySelectorAll('.btn__call')
};