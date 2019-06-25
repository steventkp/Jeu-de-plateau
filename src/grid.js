import $ from 'jquery'
import { gameConfig } from './config'
import { gameInfos } from './globals'
import { Cell } from './cell'
import { Player } from './player';
import { Weapon } from './weapon';
import { Scoreboard } from './scoreboard';

/**
 *Classe Grid qui génére le plateau et les obstacles via ses méthodes
 */
export class Grid {
    /**
     *Constructeur avec deux variables une pour la colonne et une pour la ligne
     *Une fonction build qui permet de construire le plateau
     *et une fonction createObstacle pour génerer les obstacles
     *Crée une instance de Grid
     */
    constructor() {
        this.col = gameConfig.boardSize;
        this.row = gameConfig.boardSize;
        this.build(this.col,this.row);
        this.createObstacle(gameConfig.numberObstacles);
        this.createWeapons(gameConfig.numberWeapons);
        this.createPlayers(gameConfig.numberPlayers);
    }
    /**
     *Getter qui récupére un entier aléatoire compris entre 0 et le nombre de cases du plateau
     * @readonly
     * @memberof Grid
     */
    get randomCellId(){
        return Math.floor(Math.random() * Math.floor(this.col * this.row));
    }
    /**
     *Getter qui récupère les id des cases qui se situent coté droit du plateau
     *@readonly
     *@memberof Grid
     */
    get rightCellsBorder(){
        let rightCells = [];
        for (let i = gameConfig.boardSize-1;i < (gameConfig.boardSize * gameConfig.boardSize) ;i+=gameConfig.boardSize){
            rightCells.push(i);
        }
        return rightCells;
    }
    /**
     *Getter qui récupère les id des cases qui se situent coté droit du gauche
     *@readonly
     *@memberof Grid
     */
    get leftCellsBorder(){
        let leftCells = [];
        for (let i = 0;i < (gameConfig.boardSize * gameConfig.boardSize);i+=gameConfig.boardSize){
            leftCells.push(i);
        }
        return leftCells;
    }

    /**
     *Méthode build qui créer le plateau avec numberCols et numberRows passés en paramètres
     * @param {*} numberCols (Nombre de colonnes)
     * @param {*} numberRows (Nombre de lignes)
     * @memberof Grid
     */
    build(numberCols, numberRows) {
        const table = document.createElement('table');
        table.id = 'game';
        let k = -1;
        for (let i = 0; i < (numberRows); i++) {
            const tr = document.createElement('tr');
            $(table).append(tr);
            for (let j = 0; j < (numberCols); j++) {
                k += 1;
                const td = new Cell().build(k);
                $(tr).append(td);
            }
        }
        $('#board').append(table);
        gameInfos.boardgameLimitsLeftSide = this.leftCellsBorder;
        gameInfos.boardgameLimitsRightSide = this.rightCellsBorder;
    }
    /**
     *Ajout les obstacles sur un ID aléatoire en les affichant via css et en stockant l'ID dans la variable dans
     *les tableaux usedCellIndexes et obstaclesPositions
     * @param {*} numberObstacles(Le nombre d'obstacles voulu est passé en paramètre)
     * @memberof Grid
     */
    createObstacle(numberObstacles) {
        let i = 1;
        while(i <= numberObstacles && numberObstacles > 0) {
            const randomId = this.randomCellId;
            if(!gameInfos.usedCellIndexes.includes(randomId)) {
                $('#'+randomId).addClass('obstacle-case');
                gameInfos.obstaclesPositions.push(randomId);
                gameInfos.usedCellIndexes.push(randomId);
                i++;
            }
        }
    }
    /**
     *Ajout des armes sur un ID aléatoire
     * @param {*} numberWeapons (Le nombre d'armes voulu sur le plateau est passé en paramètre)
     * @memberof Grid
     */
    createWeapons(numberWeapons) {
        let i = 0;
        while(i < numberWeapons) {
            const randomId = this.randomCellId;
            if(!gameInfos.usedCellIndexes.includes(randomId)) {
                gameInfos.weapons.push(new Weapon(gameInfos.data.weapons[i].id,randomId,gameInfos.data.weapons[i].damage,'pokeball'+i));
                gameInfos.weaponsPositions.push(randomId);
                gameInfos.usedCellIndexes.push(randomId);
                i++;
            }
        }
    }
    /**
     *Ajout des players sur un ID aléatoire
     * @param {*} numberPlayers(Le nombre de joueurs est passé en paramètre)
     * @memberof Grid
     */
    createPlayers(numberPlayers) {
        let i = 0;
        while(i < numberPlayers) {
            const randomId = this.randomCellId;
            if(!gameInfos.usedCellIndexes.includes(randomId) && !this.checkAround(randomId)){
                gameInfos.players.push(new Player(i,'Pseudo'+i,gameConfig.hpPlayers,gameConfig.defaultWeaponId+i,randomId,'player'+i));
                gameInfos.usedCellIndexes.push(randomId);
                gameInfos.playersPositions.push(randomId);
                gameInfos.scoreboards.push(new Scoreboard(gameInfos.players[i].name,i,gameInfos.players[i].classImg,gameConfig.hpPlayers,gameConfig.defaultWeaponDamages,gameConfig.defaultWeaponClassCss));
                i++;
            }
        }
        this.playRound();
    }
    /**
     *Vérifie qu'il n'y a pas de joueur qui se situe sur les cases adjacentes
     * @param {*} positionPlayer(la position du joueur sur lequel on effectue la recherche est passé en paramètre)
     * @returns(retourne un booléen en fonction du résultat)
     * @memberof Grid
     */
    checkAround(positionPlayer){
        if(gameInfos.playersPositions.includes(positionPlayer+1)
            || gameInfos.playersPositions.includes(positionPlayer-1)
            || gameInfos.playersPositions.includes(positionPlayer+gameConfig.boardSize)
            || gameInfos.playersPositions.includes(positionPlayer-gameConfig.boardSize)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     *Met en surbrillance les cases accessibles à droite du joueur concerné
     * @param {*} position(La position du joueur concerné est passé en paramètre)
     * @memberof Grid
     */
    accessiblesRightCells(position){
        for (let i = 1; i <= 3; i++){
            if(!gameInfos.obstaclesPositions.includes((position + i)) && !gameInfos.playersPositions.includes((position + i))
            && !this.leftCellsBorder.includes(position + i) ){
                $(`#${position + i}`).addClass('highlighted-cell');
            } else {
                break;
            }
        }
    }
    /**
     *Met en surbrillance les cases accessibles en bas du joueur concerné
     * @param {*} position(La position du joueur concerné est passé en paramètre)
     * @memberof Grid
     */
    accessiblesDownCells(position){
        for (let i = gameConfig.boardSize; i <= 3*gameConfig.boardSize; i+=gameConfig.boardSize)
        if(!gameInfos.obstaclesPositions.includes((position + i)) && !gameInfos.playersPositions.includes((position + i))){
            $(`#${position + i}`).addClass('highlighted-cell');
        } else {
            break;
        }
    }
    /**
     *Met en surbrillance les cases accessibles à gauche du joueur concerné
     * @param {*} position(La position du joueur concerné est passé en paramètre)
     * @memberof Grid
     */
    accessiblesLeftCells(position){
        for (let i = 1; i <= 3; i++){
            if(!gameInfos.obstaclesPositions.includes((position - i)) && !gameInfos.playersPositions.includes((position - i))
            && !this.rightCellsBorder.includes(position - i) ){
                $(`#${position - i}`).addClass('highlighted-cell');
            } else {
                break;
            }
        }
    }
    /**
     *Met en surbrillance les cases accessibles en haut du joueur concerné
     * @param {*} position(La position du joueur concerné est passé en paramètre)
     * @memberof Grid
     */
    accessiblesUpCells(position){
        for (let i = gameConfig.boardSize; i <= 3*gameConfig.boardSize; i+=gameConfig.boardSize)
        if(!gameInfos.obstaclesPositions.includes((position - i)) && !gameInfos.playersPositions.includes((position - i))){
            $(`#${position - i}`).addClass('highlighted-cell');
        } else {
            break;
        }
    }

    /**
     *Lance un tour avec affichage des cases accessibles et lancement de la fonction de déplacement
     * @memberof Grid
     */
    playRound(){
        if(gameInfos.beginFight !== true){
            gameInfos.currentPlayer = this.switchPlayer();
            this.accessiblesRightCells(gameInfos.players[gameInfos.currentPlayer].position);
            this.accessiblesDownCells(gameInfos.players[gameInfos.currentPlayer].position);
            this.accessiblesLeftCells(gameInfos.players[gameInfos.currentPlayer].position);
            this.accessiblesUpCells(gameInfos.players[gameInfos.currentPlayer].position);
            gameInfos.scoreboards[gameInfos.currentPlayer].addCurrentPlayerScoreboard();
            gameInfos.players[gameInfos.currentPlayer].move();
        }
    }
    /**
     *Change l'ID du joueur dans la variable gameInfos.currentPlayer
     * @returns (renvoi l'ID du joueur)
     * @memberof Grid
     */
    switchPlayer(){
        gameInfos.currentPlayer = gameInfos.currentPlayer === 1 ? 0 : 1;
        return gameInfos.currentPlayer;
    }
    /**
     *Fonction qui lance l'animation d'un vortex
     * @memberof Grid
     */
    vortexAnimation(){
    $('#board').addClass('rotate');
        setTimeout(() => {
            $('.obstacle-case').addClass('visibility-hidden');
        }, 1000);
        setTimeout(() => {
            $('.weapon').addClass('visibility-hidden');
        }, 2000);
        setTimeout(() => {
            $("#board *").css("border","1px solid rgba(0, 0, 0, 0.0)");
        }, 2500);
        setTimeout(() => {
            $('#fight-buttons').css('visibility','visible');
        },3500);
    }
    /**
     *Permet d'afficher un message dans la console du jeu
     * @param {*} message
     * @memberof Grid
     */
    messageUpdate(message){
        $('#console').html('<p>' + message + '</p>');
        $('#console').toggleClass('background-color-console background-color-console-toggle');
    }
}