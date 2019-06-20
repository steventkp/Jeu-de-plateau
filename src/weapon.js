import $ from 'jquery'
export class Weapon {
    /**
     *Créer une instance de weapon.
     * @param {*} weaponId
     * @param {*} position
     * @param {*} damage
     * @param {*} classImg
     * @memberof Weapon
     */
    constructor(weaponId,position,damage,classImg){
        this.id = weaponId;
        this.position = position;
        this.damage = damage;
        this.classImg = classImg;
        this.create(classImg,this.position);
    }
    /**
     *Affiche une arme
     * @param {*} classImg (Classe CSS de l'image)
     * @param {*} position (position)
     * @memberof Weapon
     */
    create(classImg,position){
        $('#'+position)
        .addClass(classImg)
        .addClass('weapon');
    }
    /**
     *Retire une arme
     * @param {*} classImg (Classe CSS de l'image)
     * @param {*} position (position)
     * @memberof Weapon
     */
    remove(classImg,position){
        $('#'+position)
        .removeClass(classImg)
        .removeClass('weapon');
    }
}

