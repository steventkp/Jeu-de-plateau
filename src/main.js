import $ from 'jquery';
import { gameInfos } from './globals';
import { gameConfig } from './config';
import { services } from './services';
import { Grid } from './grid';
import { powerOn }from './gameboy';
/****
 * La réponse de la promise est retournée dans une variable gameInfos.data
 * et découpée dans plusieurs catégories
 */
const getDataJson = () => {
services.getData(gameConfig.fileJson)
	.then(function (data) {
		gameInfos.data.weapons = data.game.weapons;
		gameInfos.data.players = data.game.players;
		gameInfos.data.rulesFight = data.game.fight_rules;
		gameInfos.data.rulesBoard = data.game.board_rules;
		jsonDone();
	})
}
const jsonDone = () => {
	gameInfos.board = new Grid();
	powerOn();
}
$(function () {
	getDataJson();
});