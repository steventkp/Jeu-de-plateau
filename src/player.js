import $ from 'jquery'
import { gameInfos } from './globals';
import { gameConfig } from './config';

/**
 *La classe Player permet de créer un joueur via son constructeur et d'éxécuter ses méthodes
 * @export
 * @class Player
 */
export class Player {
    constructor(playerId,name,hp,weaponId,position,urlsImg){
        this.playerId = playerId;
        this.name = name;
        this.hp = hp;
        this.weaponId = weaponId;
        this.position = position;
        this.urlsImg = urlsImg;
        this.create(urlsImg);
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
    create(urlsImg) {
        $('#'+this.position)
            .append('<span><img class="player" src=' + require(''+urlsImg[0]+'') + '></></span>');
    }
    /**
     *Fonctionne qui permet à un joueur de se déplacer
     * @memberof Player
     */
    move(){
        this.idHighlightedCells;
        for (let i = 0; i < $(".highlighted-cell").length; i++){
            let $cellId = $('[id="' + gameInfos.tempHighlightedCases[i] + '"]');
            $cellId.off('click').one('click',() => {
                //On retire les écouteurs d'évenèments
                this.removeListeners();
                gameInfos.currentPlayer = this.playerId;
                //On retire l'image de la position actuelle du joueur
                $('#'+this.position+'>'+'span').remove();
                //On ajoute l'image sur la position qui a été cliquée
                $('[id="' + gameInfos.tempHighlightedCases[i] + '"]').append('<span><img class="player" src=' + require(''+this.urlsImg[0]+'') + '></></span>');
                //Mise à jour de la position du joueur dans l'objet instancié player
                this.position = parseInt(gameInfos.tempHighlightedCases[i]);
                //Mise à jour de la position aussi dans le tableau
                gameInfos.playersPositions[this.playerId] = parseInt(gameInfos.tempHighlightedCases[i]);
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
}