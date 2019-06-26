/**
 * Fichier de configuration du jeu
 * boardSize (Nombre de cases sur les axes x et y)
 * numberObstacles (Nombre d'obstacles à génerer)
 */
export const gameConfig = {
    fileJson : 'https://api.myjson.com/bins/o2iat',//Fichier JSON contenant données sur les armes et les règles du jeu
    boardSize: 10, //Nombre de cases sur chacun des 2 axes x et y
    numberObstacles: 10,
    numberPlayers: 2,
    hpPlayers: 100,
    numberWeapons: 4,
    defaultWeaponId: 4,
    defaultWeaponDamages:10,
    defaultWeaponClassCss:'pokeball-default'
}
