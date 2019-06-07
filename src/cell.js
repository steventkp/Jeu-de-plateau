/**
 *
 *
 * @export
 * @class Cell
 */
export class Cell {
    constructor(positionX,positionY){
        this.positionX = positionX;
        this.positionY = positionY;
        this.build(this.positionX,this.positionY);
    }
    /**
     *
     *
     * @param {*} positionX
     * @param {*} positionY
     * @returns
     * @memberof Cell
     */
    build(positionX,positionY){
        const tdHtml = document.createElement('td');
        tdHtml.id = parseInt(positionX+''+positionY);
        return td;
    }
}
