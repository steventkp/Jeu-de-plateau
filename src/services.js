import $ from 'jquery'

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
                console.log('Erreur dans la récuperation des données ! '+err);
            })
        });
        return thisData;
    }
}