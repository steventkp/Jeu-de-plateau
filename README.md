# PROJET 6 - Créez un jeu de plateau tour par tour en JS
Réalisé dans le cadre de la formation développeur d'application front-end Openclassrooms

[LIEN DEMO](https://steventchakpe.com/openclassrooms/jeu_de_plateau/) 

![Image du site d'avis de restaurants](https://steventchakpe.com/openclassrooms/img/jeu_de_plateau.png)


## Etape 1 : génération de la carte
Commencez par générer aléatoirement la carte du jeu. Chaque case peut être soit :

Vide

Inaccessible (grisée)

Sur la carte, un nombre limité d’armes (4 maximum) sera placé aléatoirement et pourra être récolté par les joueurs qui passeraient dessus.

Vous inventerez au moins 4 types d’arme dans le jeu, avec des dégâts différents. L’arme par défaut qui équipe les joueurs doit infliger 10 points de dégâts. Chaque arme a un nom et un visuel associé.

Le placement des deux joueurs est lui aussi aléatoire sur la carte au chargement de la partie. Ils ne doivent pas se toucher (ils ne peuvent pas être côte à côte).

**Cette étape du projet est disponible dans la branche : Etape 1**

## Etape 2 : les mouvements

A chaque tour, un joueur peut se déplacer d’une à trois cases (horizontalement ou verticalement) avant de terminer son tour. Vos visiteurs aimeraient eux aussi donner leur avis sur des restaurants !Proposez-leur :

D'ajouter un avis sur un restaurant existant

D'ajouter un restaurant, en cliquant sur un lieu spécifique de la carte

Une fois un avis ou un restaurant ajouté, il apparaît immédiatement sur la carte. Un nouveau marqueur apparaît pour indiquer la position du nouveau restaurant.

Les informations ne seront pas sauvegardées si on quitte la page (elles restent juste en mémoire le temps de la visite.

## Etape 3 : le combat !

Si les joueurs se croisent sur des cases adjacentes (horizontalement ou verticalement), un combat à mort s’engage.

Lors d'un combat, le fonctionnement du jeu est le suivant :

Chacun attaque à son tour

Les dégâts infligés dépendent de l’arme possédée par le joueur

Le joueur peut choisir d’attaquer ou de se défendre contre le prochain coup

Lorsque le joueur se défend, il encaisse 50% de dégâts en moins qu’en temps normal

Dès que les points de vie d’un joueur (initialement à 100) tombent à 0 , celui-ci a perdu. Un message s’affiche et la partie est terminée.

## Getting Started

### Prerequisites

NodeJS version 8 min


### Installing
Installer les modules du fichier package.json :

```
npm install
```

Lancer l'application en mode développeur via la commande :

```
npm start
```

Construire le build de l'application via la commande :

```
npm run build
```


## Built With

* [WEBPACK](https://webpack.js.org/) - Bundler
* [BABEL](https://babeljs.io/) - Compilateur javascript
* [JQUERY](https://jquery.com/) - Bibliothèque javascript


## Authors

* **Steven TCHAKPE** - *Dans le cadre de la formation développeur front-end Openclasrooms* - [Openclassrooms](https://openclassrooms.com/fr/)

