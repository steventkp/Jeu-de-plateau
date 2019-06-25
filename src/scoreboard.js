import $ from 'jquery'

/**
 *Class Scoreboard qui gère l'affichage des tableaux des scores
 * @export
 * @class Scoreboard
 */
export class Scoreboard {
    /**
     *Creates an instance of Scoreboard.
     * @param {*} playerName (Nom du joueur)
     * @param {*} playerId (ID du joueur)
     * @param {*} imgUrlPlayer (Chemin relatif de l'image du joueur)
     * @param {*} playerHp (Points de vie du joueur)
     * @param {*} weaponDamages (Puissance de l'arme)
     * @param {*} weaponClassCss (Classe CSS de l'arme)
     * @memberof Scoreboard
     */
    constructor(playerName,playerId,imgUrlPlayer,playerHp,weaponDamages,weaponClassCss){
        this.playerName = playerName;
        this.playerId = playerId;
        this.imgUrlPlayer = imgUrlPlayer;
        this.playerHp =playerHp;
        this.weaponDamages = weaponDamages;
        this.weaponClassCss = weaponClassCss;
        this.initScoreboards(playerId);
    }
    /**
     *Initialise les tableaux de scores
     * @param {*} playerId
     * @memberof Scoreboard
     */
    initScoreboards(playerId){
        $('.scoreboard--name--player' + playerId).html(this.playerName);
        $('.scoreboard--img--player' + playerId).addClass(this.imgUrlPlayer);
        $('.scoreboard--hp--player' + playerId).html(this.playerHp);
        $('.scoreboard--weapon--damages--player' + playerId).html(this.weaponDamages);
        $('.scoreboard--weapon--img--player' + playerId).addClass(this.weaponClassCss);
    }
    /**
     *Mise à jour de l'arme dans le tableau de score d'un joueur
     * @param {*} playerId(ID du joueur)
     * @param {*} currentWeaponClass(Classe CSS de l'arme portée par le joueur)
     * @param {*} newWeaponClass(Classe CSS de l'arme ramassée par le joueur)
     * @param {*} newWeaponDamages(Classe CSS de l'arme )
     * @memberof Scoreboard
     */
    updateWeapon(playerId,currentWeaponClass,newWeaponClass,newWeaponDamages){
        $('.scoreboard--weapon--img--player' + playerId).removeClass(currentWeaponClass);
        $('.scoreboard--weapon--img--player' + playerId).addClass(newWeaponClass);
        $('.scoreboard--weapon--damages--player' + playerId).html(newWeaponDamages);
    }
    /**
     *Ajoute une classe pour mettre le scoreboard d'un joueur en surbrillance
     * @memberof Scoreboard
     */
    addCurrentPlayerScoreboard(){
        $('.scoreboard--player'+this.playerId).addClass('scoreboard--highlighted');
    }
    /**
     *Supprime la classe qui met le scoreboard en surbrillance
     * @memberof Scoreboard
     */
    removeCurrentPlayerScoreboard(){
        $('.scoreboard--player'+this.playerId).removeClass('scoreboard--highlighted');
    }
    /**
     *Met à jour les points de vie du joueur et la barre de hp
     * @param {*} hp
     * @memberof Scoreboard
     */
    updateHp(hp){
        $('.scoreboard--hp--player'+this.playerId).html(hp);
        $('.scoreboard--hp-bar--player'+this.playerId).width(hp+'%');
    }
    /**
     *Ajoute le nom du joueur passé en paramètre sur le tableau des scores
     * @param {*} playerId
     * @param {*} playerName
     * @memberof Scoreboard
     */
    addPlayerName(playerId,playerName){
        $('.scoreboard--name--player' + playerId).html(playerName);
    }
}

