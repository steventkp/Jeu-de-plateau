import $ from 'jquery'
export class Weapon {
    constructor(weaponId,position,damage,urlsImg){
        this.id = weaponId;
        this.position = position;
        this.damage = damage;
        this.urlsImg = urlsImg;
        this.create(urlsImg);
    }
    /**
     *Génère une arme via css
     * @param {*} urlsImg(Url de l'image est passé en paramètre)
     * @memberof Weapon
     */
    create(urlsImg){
        $('#'+this.position)
        .addClass('weapon')
        .css("background-image", "url(" + require(''+urlsImg[0]+'') + ")");
    }
}

