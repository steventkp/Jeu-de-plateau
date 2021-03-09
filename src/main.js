import $ from "jquery";
import { gameInfos, jsonGame } from "./globals";
import { gameConfig } from "./config";
import { services } from "./services";
import { Grid } from "./grid";
import { powerOn } from "./gameboy";

/****
 * La réponse de la promise est retournée dans une variable gameInfos.data
 * et découpée dans plusieurs catégories
 */

const getDataJson = () 
=> {
  gameInfos.data.weapons = jsonGame.game.weapons;
  gameInfos.data.players = jsonGame.game.players;
  gameInfos.data.rulesFight = jsonGame.game.fight_rules;
  gameInfos.data.rulesBoard = jsonGame.game.board_rules;
  jsonDone();
};
const jsonDone = () => {
  gameInfos.board = new Grid();
  powerOn();
};
$(function () {
  getDataJson();
});
