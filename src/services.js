import $ from 'jquery';
import { displayModalText } from './gameboy';

export const services = {
    /***
     * getData permet de créer une promise dont l'url est passé en paramètre
     * La promise retourne les données du jeu contenus dans un fichier JSON
     */
    getData:() => {
        return {
            "game":{
                "weapons":[
                    {
                        "id":0,
                        "position":null,
                        "name":"eau",
                        "damage":20,
                        "classImg":"pokeball0"
                    },
                    {
                        "id":1,
                        "position":null,
                        "name":"plante",
                        "damage":30,
                        "classImg":"pokeball1"
                    },
                    {
                        "id":2,
                        "position":null,
                        "name":"électrique",
                        "damage":40,
                        "classImg":"pokeball2"
                    },
                    {
                        "id":3,
                        "position":null,
                        "name":"feu",
                        "damage":50,
                        "classImg":"pokeball3"
                    },
                    {
                        "id":4,
                        "position":null,
                        "name":"normal",
                        "damage":10,
                        "classImg":"pokeball-default"
                    },
                    {
                        "id":5,
                        "position":null,
                        "name":"normal",
                        "damage":10,
                        "classImg":"pokeball-default"
                    }
                ],
                "players":[
                    {
                        "name":null,
                        "position":null,
                        "hp":null,
                        "weaponId":null,
                        "classImg":"player0"
                    },
                    {
                        "name":null,
                        "position":null,
                        "hp":null,
                        "weaponId":null,
                        "classImg":"player1"
                    }
                ],
                "fight_rules":[
                    "Règles du combat",
                    "Chaque joueur attaque chacun à son tour.",
                    "Les dégâts infligés dépendent de l’arme possédée par le joueur.",
                    "Le joueur peut choisir d’attaquer ou de se défendre contre le prochain coup.",
                    "Lorsque qu'un joueur se défend, il encaisse 50% de dégâts en moins qu’en temps normal.",
                    "Dès que les points de vie d’un joueur (initialement à 100) tombent à 0 , celui-ci a perdu."
                ],
                "board_rules":[
                    "Règles du jeu",
                    "Au lancement du jeu, chaque joueur possède une arme par défaut de puissance 10.",
                    "A chaque tour le joueur peut se déplacer d'une à trois cases.",
                    "Le joueur ne peut évidemment pas se déplacer à travers un joueur ou un obstacle.",
                    "Si un joueur passe sur une case contenant une arme,il laisse son arme et remplaçe par la nouvelle.",
                    "Si les 2 joueurs se croisent sur le cases adjacentes, un combat à mort se lance."
                ]
            }
        };
    }
}
/**
 * Permet d'afficher une message d'erreur
 */
const errorGetData = () => {
    const msg = ['Une erreur s\'est produite lors de la récupération des données ...', 'Veuillez nous excuser pour la gêne occasionnée et revenir ultérieurement.', 'Si le problème persite merci de bien vouloir contacter l\'administrateur du site.'];
    $('#intro').fadeOut();
    $('#player-names').fadeOut();
    displayModalText(msg);
}