import { Grid} from './grid';
import $ from 'jquery'

$(function() {
    const grid = new Grid();
    grid.createGrid()
    grid.createObstacle();
  });