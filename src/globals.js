/**
 * Informations stockés pour le fonctionnement du jeu
 */
export const gameInfos = {
    data:{},
    usedCellIndexes:[],
    obstaclesPositions:[],
    weaponsPositions:[],
    playersPositions:[],
    tempHighlightedCases:[],
    board:null,
    boardgameLimitsLeftSide:[],
    boardgameLimitsRightSide:[],
    weapons:[],
    players:[],
    scoreboards:[],
    rulesBoard:[],
    rulesFight:[],
    currentPlayer:0
}

export const gameSounds = {
    //Tous les fichiers audio utilisés dans le jeu
    battle: new Audio(require('./assets/audio/battle.mp3')),
    meet: new Audio(require('./assets/audio/meet.mp3')),
    defeat: new Audio(require('./assets/audio/defeat.mp3')),
    pokeball: new Audio(require('./assets/audio/pokeball.mp3')),
    victory: new Audio(require('./assets/audio/victory.mp3')),
    attack: new Audio(require('./assets/audio/attack.mp3')),
    startup: new Audio(require('./assets/audio/gbstartupsound.mp3')),
    intro: new Audio(require('./assets/audio/intro.mp3')),
    ambiance: new Audio(require('./assets/audio/ambiance.mp3'))
}