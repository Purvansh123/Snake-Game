import { getInputDirection } from "./input.js";

export const snakeSpeed = 5;
const snakeBody = [{x:11,y:11}]
let newSegment = 0


// const snakeBody = [
//   { x: 10, y: 11 },
//   { x: 11, y: 11 },
//   { x: 12, y: 11 },
// ];

export function update() {
  addSegment();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakElement = document.createElement("div");
    snakElement.style.gridRowStart = segment.y;
    snakElement.style.gridColumnStart = segment.x;
    snakElement.classList.add("snake");
    gameBoard.appendChild(snakElement);
  });
}

export function expandSnake(amount){
    newSegment += amount;
}

export function onSnake(position,{ignoreHead=false}={}){
    return snakeBody.some((segment,index) =>{
      if(ignoreHead && index==0) return false;
      return equalPositions(segment,position)
    })
}

export function getSnakeHead(){
  return snakeBody[0]
}

export function snakeIntersection(){
  return onSnake(snakeBody[0],{ignoreHead: true})
}

function equalPositions(pos1,pos2){
  return pos1.x==pos2.x && pos1.y == pos2.y
}

function addSegment(){
  for(let i=0;i<newSegment;i++){
    snakeBody.push({...snakeBody[snakeBody.length-1]})
  }
  newSegment=0;
}