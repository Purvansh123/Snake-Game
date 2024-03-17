import {update as updateSnake,draw as drawSnake,snakeSpeed, getSnakeHead, snakeIntersection} from "./snake.js";
import { update as updateFood ,draw as drawFood} from "./food.js";
import { outSideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver= false
const gameBoard = document.getElementById("game-board");


function main(currenTime) {
  if(gameOver){
    if (confirm('You lost. Press ok to restart.')) { //okay-true
      window.location = '/'
    }
    return 
  }

  window.requestAnimationFrame(main)
  const secondSinceLastRender = (currenTime - lastRenderTime) / 1000;
  if (secondSinceLastRender < 1 / snakeSpeed) {
    return;
  }
  lastRenderTime = currenTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver= outSideGrid(getSnakeHead()) || snakeIntersection()
}
