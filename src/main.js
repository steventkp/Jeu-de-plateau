import $ from 'jquery';
import { gameInfos } from './globals';
import { gameConfig } from './config';
import { services } from './services';
import { Grid } from './grid';
/****
 * La réponse de la promise est retournée dans une variable gameInfos.data
 * et découpée dans plusieurs catégories
 */
const getDataJson = ()=>{
services.getData(gameConfig.fileJson)
	.then(function (data) {
		gameInfos.data.weapons = data.game.weapons;
		gameInfos.data.players = data.game.players;
		gameInfos.data.rulesBoard = data.game.fight_rules;
		gameInfos.data.rulesFight = data.game.board_rules;
		jsonDone();
	})
	.catch(function () {
		const msg = ['Une erreur s\'est produite lors de la récupération des données ...', 'Veuillez nous excuser pour la gêne occasionnée et revenir ultérieurement.', 'Si le problème persite merci de bien vouloir contacter l\'administrateur du site.'];
	})
}
const jsonDone = ()=>{
	gameInfos.board = new Grid;
}
$(function () {
	getDataJson();
});

