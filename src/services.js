import $ from 'jquery';
import { displayModalText } from './gameboy';

export const services = {
    /***
     * getData permet de créer une promise dont l'url est passé en paramètre
     * La promise retourne les données du jeu contenus dans un fichier JSON
     */
    getData:(url) => {
        const thisData = new Promise(function (resolve, reject) {
            $.get(url, (dataPromise) => {
                dataPromise ? resolve(dataPromise) : reject(err);
            }).fail(function () {
                errorGetData();
            })
        });
        return thisData;
    }
}

const errorGetData = () => {
    const msg = ['Une erreur s\'est produite lors de la récupération des données ...', 'Veuillez nous excuser pour la gêne occasionnée et revenir ultérieurement.', 'Si le problème persite merci de bien vouloir contacter l\'administrateur du site.'];
    $('#intro').fadeOut();
    $('#player-names').fadeOut();
    displayModalText(msg);
}