import $ from 'jquery'
import { Weapon } from './weapon';
import { gameConfig } from './config';
import { gameInfos, gameSounds } from './globals';
import { displayModalText,closeModalText} from './gameboy';

/**
 *La classe Player permet de créer un joueur via son constructeur et d'éxécuter ses méthodes
 * @export
 * @class Player
 */
export class Player {
    /**
     *Créer une instance de player
     * @param {*} playerId (ID du joueur)
     * @param {*} name (Pseudo du joueur)
     * @param {*} hp (Nombre de points de vie)
     * @param {*} weaponId (ID de l'arme du joueur)
     * @param {*} position (Position sur le plateau)
     * @param {*} classImg (Classe CSS de l'image du joueur)
     * @memberof Player
     */
    constructor(playerId,name,hp,weaponId,position,classImg){
        this.playerId = playerId;
        this.name = name;
        this.hp = hp;
        this.weaponId = weaponId;
        this.position = position;
        this.classImg = classImg;
        this.create(classImg);
        this.createDefaultWeaponPlayer();
    }
    get idHighlightedCells(){
        $(".highlighted-cell").each(function(){
            gameInfos.tempHighlightedCases.push((this.id));
        });
    }
    /**
     *Génère le joueur via css
     * @param {*} urlsImg(Url de l'image est passé en paramètre)
     * @memberof Player
     */
    create(classImg) {
        $('#'+this.position)
        .addClass(classImg);
    }
    /**
     *Fonctionne qui permet à un joueur de se déplacer
     * @memberof Player
     */
    createDefaultWeaponPlayer(){
        gameInfos.weapons.push(new Weapon((gameInfos.weapons.length-1)+1,null,gameConfig.defaultWeaponDamages,'pokeball-default'));
    }
    move(){
        this.idHighlightedCells;
        for (let i = 0; i < $(".highlighted-cell").length; i++){
            let $cellId = $('[id="' + gameInfos.tempHighlightedCases[i] + '"]');
            $cellId.off('click').one('click',() => {
                //On retire les écouteurs d'évenèments
                this.removeListeners();
                gameInfos.currentPlayer = this.playerId;
                //On retire l'image de la position actuelle du joueur
                $('#'+this.position).removeClass(this.classImg);
                //On ajoute l'image sur la position qui a été cliquée
                $('#'+ gameInfos.tempHighlightedCases[i]).addClass(this.classImg);
                //Mise à jour de la position du joueur dans l'objet instancié player
                this.position = parseInt(gameInfos.tempHighlightedCases[i]);
                //Mise à jour de la position aussi dans le tableau
                gameInfos.playersPositions[this.playerId] = parseInt(gameInfos.tempHighlightedCases[i]);
                //On vérifie la présence d'une arme
                this.checkWeapon(parseInt(gameInfos.tempHighlightedCases[i]))
                //On cherche la présence la présence d'un joueur pour engager un combat
                this.checkingFight(parseInt(gameInfos.tempHighlightedCases[i]));
                //On retire la classe CSS du joueur en cours dans le tableau des scores (coloration)
                gameInfos.scoreboards[gameInfos.currentPlayer].removeCurrentPlayerScoreboard();
                //On retire les cases en surbrillances
                this.removeHighlightedCells();
                //On vide le tableau contenant les ID des cases cliquables
                gameInfos.tempHighlightedCases.length = 0;
                //On lance un nouveau round
                gameInfos.board.playRound();
            });
        }
    }
    /**
     *Retire tous les listeners click des cases en surbrillances
     * @memberof Player
     */
    removeListeners(){
        for (let i=0; i < gameInfos.tempHighlightedCases.length; i++) {
            let $cellId = $('[id="' + gameInfos.tempHighlightedCases[i] + '"]');
            $cellId.off('click');
        }
    }
    /**
     *Retire toutes les cases en surbrillances
     * @memberof Player
     */
    removeHighlightedCells(){
        $(".highlighted-cell").each(function(){
            $(this).removeClass("highlighted-cell");
        });
    }
    /**
     *Vérifie s'il y a une arme sur l'ID de la case passée en paramètre
     *et appelle la fonction replaceWeapon s'il y a une arme
     * @param {*} position(ID de la case)
     * @memberof Player
     */
    checkWeapon(position){
        if(gameInfos.weaponsPositions.includes(position)){
            this.replaceWeapon(position);
        }
    }
    /**
     *Remplace l'arme situé
     * @param {*} position
     * @memberof Player
     */
    replaceWeapon(position){
        const currentW = gameInfos.players[gameInfos.currentPlayer].weaponId;
        const cellW = this.searchIndexWeapon(position);
        gameInfos.players[gameInfos.currentPlayer].weaponId = cellW;
        this.updatePositionWeapon(currentW,position);
        this.updatePositionWeapon(cellW,null);
        gameInfos.weapons[cellW].remove(gameInfos.weapons[cellW].classImg,position);
        gameInfos.weapons[currentW].create(gameInfos.weapons[currentW].classImg,position);
        gameInfos.scoreboards[gameInfos.currentPlayer].updateWeapon(gameInfos.currentPlayer,gameInfos.weapons[currentW].classImg,gameInfos.weapons[cellW].classImg,gameInfos.weapons[cellW].damage);
    }
    /**
     *Recherche l'index d'une arme avec l'ID de sa position sur le plateau
     * @param {*} position(ID de la case)
     * @returns (retourne l'id de l'arme)
     * @memberof Player
     */
    searchIndexWeapon(position){
        for (let value of gameInfos.weapons){
            if(value.position === position){
                return value.id;
            }
        }
    }
    /**
     *Met à jour la position de l'arme dans l'objet gameInfos.weapons
     * @param {*} weaponId (ID de l'arme )
     * @param {*} position (Position de l'arme sur le plateau)
     * @memberof Player
     */
    updatePositionWeapon(weaponId,position){
        for (let value of gameInfos.weapons){
            if(value.id === weaponId){
                value.position = position;
            }
        }
    }
    /**
     *Vérifie s'il y a un joueur qui se situe sur les cases adjacentes pour engager un combat
     * @param {*} playerPostition
     * @memberof Player
     */
    checkingFight(playerPostition){
        if(gameInfos.boardgameLimitsLeftSide.includes(playerPostition)){
            if(this.checkPlayerRight(playerPostition)){
                gameInfos.beginFight = true;
                this.meetingPlayer();
            }
        } else if(gameInfos.boardgameLimitsRightSide.includes(playerPostition)){
            if(this.checkPlayerLeft(playerPostition)){
                gameInfos.beginFight = true;
                this.meetingPlayer();
            }
        } else {
            if(gameInfos.board.checkAround(playerPostition)){
                gameInfos.beginFight = true;
                this.meetingPlayer();
            };
        }
    }
    /**
     *Vérifie s'il n'y a pas un joueur sur les cases au dessus, en dessous et à gauche
     * @param {*} playerPostition
     * @returns
     * @memberof Player
     */
    checkPlayerLeft(playerPostition){
        if(gameInfos.playersPositions.includes(playerPostition - 1)
        || gameInfos.playersPositions.includes(playerPostition + gameConfig.boardSize)
        || gameInfos.playersPositions.includes(playerPostition - gameConfig.boardSize)){
            return true;
        } else {
            return false;
        }
    }
    /**
    *Vérifie s'il n'y a pas un joueur sur les cases au dessus, en dessous et à droite
     * @param {*} playerPostition
     * @returns
     * @memberof Player
     */
    checkPlayerRight(playerPostition){
        if(gameInfos.playersPositions.includes(playerPostition + 1)
        || gameInfos.playersPositions.includes(playerPostition + gameConfig.boardSize)
        || gameInfos.playersPositions.includes(playerPostition - gameConfig.boardSize)){
            return true;
        } else {
            return false;
        }
    }
    /**
     *Affichage d'une modale lors d'une rencontre avec un joueur
     * @memberof Player
     */
    meetingPlayer(){
        gameInfos.players[gameInfos.currentPlayer].removeHighlightedCells();
        gameInfos.scoreboards[gameInfos.currentPlayer].removeCurrentPlayerScoreboard();
        gameInfos.tempHighlightedCases.length = 0;
        setTimeout(() => {
            //Affichage d'une modal
            displayModalText(gameInfos.data.rulesFight);
            gameSounds.ambiance.pause();
            gameSounds.meet.play();
            gameSounds.meet.loop = true;
            window.onclick = (event) => {
                if (event.target.className !== 'background-modal-content' && event.target.className !== 'background-modal-content-text') {
                    closeModalText();
                    event.stopPropagation();
                    window.onclick = null;
                    gameSounds.meet.pause();
                    gameSounds.battle.play();
                    gameInfos.board.vortexAnimation();
                    gameInfos.players[gameInfos.currentPlayer].fightInit();
                }
            }
              $('.background-modal-content-close').off('click').one("click",() => {
                    closeModalText();
                    gameInfos.board.vortexAnimation();
                    gameInfos.players[gameInfos.currentPlayer].fightInit();
                    gameSounds.meet.pause();
                    gameSounds.battle.play();
              })
        }, 1000);
    }
    /**
     *Initialisation du combat, choix du joueur et joueur adverse
     * @memberof Player
     */
    fightInit(){
        gameInfos.currentPlayer = gameInfos.board.switchPlayer();
        setTimeout(() => {
            $('.scoreboard--player'+gameInfos.currentPlayer).addClass('scoreboard--highlighted');
        }, 200);
        gameInfos.currentPlayer === 1 ? gameInfos.rivalPlayer = 0 : gameInfos.rivalPlayer = 1;
        gameInfos.board.messageUpdate(gameInfos.players[gameInfos.currentPlayer].name+' c\'est à ton tour de jouer');
        this.choiceFightAction();
    }
    /**
     *Choix de l'action du joueur attaquer ou défendre
     * @memberof Player
     */
    choiceFightAction(){
        $(".button-attack").off('click').one('click', () => {
            setTimeout(() => {
                gameInfos.nextRound = 'attack';
                this.attack(gameInfos.players[gameInfos.currentPlayer].weaponId,gameInfos.rivalPlayer)
            }, 500);
        });
        $(".button-defense").off('click').one('click', () => {
            setTimeout(() => {
                gameInfos.nextRound = 'defend';
                this.defense();
            }, 500);
        });
    }
    /**
     *Fonction qui permet de rechercher la puissance d'une arme via son ID
     * @param {*} weaponId //(ID de l'arme)
     * @returns // Retourne la puissance de l'arme
     * @memberof Player
     */
    searchDamagesWeapon(weaponId){
        for (let value of gameInfos.weapons){
            if(value.id === weaponId){
                return value.damage;
            }
        }
    }
    /**
     *Fonction qui permet d'attaquer l'adversaire
     * @param {*} weaponId //ID de l'arme
     * @param {*} rivalPlayerId //ID de l'adversaire
     * @memberof Player
     */
    attack(weaponId,rivalPlayerId){
        const damageWeapon = this.searchDamagesWeapon(weaponId);
        if (gameInfos.nextRound === 'attack' && gameInfos.previousRound === 'defend' && (gameInfos.players[rivalPlayerId].hp - (damageWeapon / 2) > 0)){
            gameInfos.previousRound = null;
            gameInfos.nextRound = null;
            const hp = gameInfos.players[rivalPlayerId].hp - (damageWeapon / 2);
            setTimeout(() => {
                gameInfos.players[gameInfos.rivalPlayer].hp = hp;
                gameInfos.scoreboards[gameInfos.rivalPlayer].updateHp(hp);
                gameInfos.scoreboards[gameInfos.currentPlayer].removeCurrentPlayerScoreboard();
                gameInfos.players[gameInfos.currentPlayer].fightInit();
                gameSounds.attack.play();
            }, 250);

        //Lorsque l'utilisateur clique sur attack sachant que l'adversaire avait cliqué précédemment sur attack
        } else if (gameInfos.nextRound === 'attack' && gameInfos.players[rivalPlayerId].hp - damageWeapon > 0) {
            gameInfos.previousRound = null;
            gameInfos.nextRound = null;
            const hp = gameInfos.players[rivalPlayerId].hp - damageWeapon;
            gameInfos.players[gameInfos.rivalPlayer].hp = hp;
            gameInfos.scoreboards[gameInfos.rivalPlayer].updateHp(hp);
            gameInfos.scoreboards[gameInfos.currentPlayer].removeCurrentPlayerScoreboard();
            gameInfos.players[gameInfos.currentPlayer].fightInit();
            gameSounds.attack.play();
        } else {
            gameInfos.scoreboards[gameInfos.rivalPlayer].updateHp(0);
            gameSounds.defeat.play();
            gameSounds.battle.pause();
            gameSounds.victory.play();
            setTimeout(() => {
                gameInfos.board.messageUpdate(gameInfos.players[gameInfos.rivalPlayer].name+' n\'a plus de points de vie, '+ gameInfos.players[gameInfos.currentPlayer].name + ' remporte la victoire !');
            }, 1000);
            $('.background-modal-content-close').hide();
            $('.background-modal').fadeIn();
            $('#buttons').toggleClass('display-none inline-block');
            $('.background-modal-content-text').append(
            '<p class="victory-text">'+gameInfos.players[gameInfos.currentPlayer].name+' IS THE WINNER! '+
            '<br><p class="blink-animation size-victory-replay-text">PRESS ENTER TO OFF THE GAME AND START AGAIN</p>');
            $(document).on('keypress',(e) => {
                if(e.which == 13){
                    location.reload()
                }
            });

        }
    }
    /**
     *Fonction qui permet au joueur de se défendre contre une future attaque
     * @memberof Player
     */
    defense(){
        gameInfos.board.messageUpdate(gameInfos.players[gameInfos.currentPlayer].name+' a décider de se défendre contre la prochaine attaque !');
        gameInfos.nextRound = null;
        gameInfos.previousRound = 'defend';
        gameInfos.scoreboards[gameInfos.currentPlayer].removeCurrentPlayerScoreboard();
        gameInfos.players[gameInfos.currentPlayer].fightInit();
    }
}
