import $ from 'jquery'
import { constantes } from './globals';
import { gameCfg } from './config'

export class Grid {
    //Constructeur avec deux variables une pour la colonne et une pour la ligne
    //Dans notre cas on considère que notre plateau sera toujours 'carré' donc on affecte la même valeur aux deux variables
    constructor() {
        this.col = gameCfg.boardSize;
        this.row = gameCfg.boardSize;
    }

    //Création du plateau
    createGrid() {
        //On crée un élement table
        let table = document.createElement('table');
        //On lui ajouter une id board
        table.id = 'board';
        // On boucle sur un tr pour créer une ligne
        for (let i = 0; i < (this.row); i++) {
            const tr = document.createElement('tr');
            //On attache le tr à l'élement table
            $(table).append(tr);
            //On boucle une nouvelle fois pour ajouter une colonne dans la ligne que l'on vient de créer
            for (let j = 0; j < (this.col); j++) {
                //On crée cette fois un élément td
                const td = document.createElement('td', table.rows[i]);
                //On attache notre élément crée à la table
                $(table).append(td);
                //On ajouter un ID que l'on crée à partir des deux variables i et j 
                //Le parseInt est appliqué pour avoir par exemple la première ligne qui a pour ID : '0' au lieu de  '00'
                td.id = parseInt(i + '' + j);
                //On ajouter un objet contenant différentes propriétés dans un tableau 'constantes.cells'
                //Ce tableau permettera de stocker des informations utiles et les mettres à jour par la suite
                constantes.cells.push({
                    // Indique la présence ou non d'un obstacle
                    obstacle: false
                });
            }
        }
        // On attache notre tableau au body html
        $('body').append(table);
    }
    //Methode qui permet de créer un obstacle
    createObstacle() {
        //On initialise la variable i à zéro
        let i = 0;
        //On boucle. Tant qu'on a pas atteint le nombre d'obstacle, on continue
        //NB : Le nombre d'obstacle se modifie dans le fichier config js (numberObstacles)
        while (i < gameCfg.numberObstacles) {
            //On initialise la variable randomInt avec un nombre aléatoire qui peut aller jusqu'a 99 compris, 100 est exclu
            const randomInt = Math.floor(Math.random() * Math.floor(100));
            //On utilise un switch case 
            switch (constantes.cells[randomInt].obstacle) {
                //Si il n'y a pas d'obstacle à l'index de notre tableau de cellules alors ..
                case false:
                    //On modifie le booleen pour lui indiquer que l'on va mettre un obstacle 
                    constantes.cells[randomInt].obstacle = true;
                    //On ajoute dans le DOM à l'ID correspondant une classe obstacle qui va ajouter une image
                    $('#' + randomInt).addClass('obstacle-case');
                    //On incrémente pour arriver jusqu'au nombre d'obstacles voulu
                    i++;
                    break;
                //Si la valeur du switch est true(si un obstacle est situé l'index correspondant au random)
                //on effectue aucune instruction et on retourne dans la boucle
                case true:
                    break;
            }
        }
    }
}