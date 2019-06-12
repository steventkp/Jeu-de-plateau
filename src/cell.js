/**
 *Classe qui permet de générer les cases via constructeur
 * @export
 * @class Cell
 */
export class Cell {
    constructor(position){
        this.position = position;
        this.build(this.position);
    }
    /**
     *Méthode qui permet de créer une cellule
     *
     * @param {*} position(l'id de la cellule est passé en paramètre)
     * @returns(il retourne un élement html <td>)
     * @memberof Cell
     */
    build(position){
        const tdHtml = document.createElement('td');
        tdHtml.id = position;
        return tdHtml;
    }
}
