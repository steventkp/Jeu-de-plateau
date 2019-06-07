import $ from 'jquery'
import { gameConfig } from './config'
import { gameInfos } from './globals'
import { Cell } from './cell'

/**
 *Classe Grid qui génére le plateau et les obstacles via ses méthodes
 * @export
 * @class Grid
 */
export class Grid {
    /**
     *Constructeur avec deux variables une pour la colonne et une pour la ligne
     *Une fonction build qui permet de construire le plateau
     *et une fonction createObstacle pour génerer les obstacles
     *Crée une instance de Grid
     * @memberof Grid
     */
    constructor() {
        this.col = gameConfig.boardSize;
        this.row = gameConfig.boardSize;
        this.build(this.col,this.row);
        this.createObstacle(gameConfig.numberObstacles);
    }
    /**
     *Getter qui récupére un entier aléatoire compris entre 0 et le nombre de cases du plateau
     * @readonly
     * @memberof Grid
     */
    get randomCellId(){
        return Math.floor(Math.random() * Math.floor(this.col * this.row));
    }
    //Création du plateau
    /**
     *Méthode build qui créer le plateau avec numberCols et numberRows passés en paramètres
     * @param {*} numberCols (Nombre de colonnes)
     * @param {*} numberRows (Nombre de lignes)
     * @memberof Grid
     */
    build(numberCols, numberRows) {
        //On crée un élement table
        let table = document.createElement('table');
        //On lui ajouter une id board
        table.id = 'board';
        // On boucle sur un tr pour créer une ligne
        for (let i = 0; i < (numberRows); i++) {
            const tr = document.createElement('tr');
            //On attache le tr à l'élement table
            $(table).append(tr);
            //On boucle une nouvelle fois pour ajouter une colonne dans la ligne que l'on vient de créer
            for (let j = 0; j < (numberCols); j++) {
                //On crée cette fois un élément td
                const td = new Cell().build(i,j);
                //On attache notre élément crée à la table
                $(tr).append(td);
            }
        }
        // On attache notre tableau au body html
        $('body').append(table);
    }
    /**
     *
     * @param {*} numberObstacles
     * @memberof Grid
     */
    createObstacle(numberObstacles) {
        let i = 1;
        while(i <= numberObstacles && numberObstacles > 0){
            const randomId = this.randomCellId;
            if(!gameInfos.obstaclesIndexes.includes(randomId)){
                $('#'+randomId).addClass('obstacle-case');
                gameInfos.obstaclesIndexes.push(randomId);
                i++;
            }
        }
    }
}

