// Game constant
let inputDir = {x: 0, y: 0};
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound =  new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
const winSound = new Audio("win.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x:13, y:15}];
let food = {x:5,y:6};

//Game function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    
}

function isCollide(snake){
    // if snake bump into yourself 
    for(let i = 1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            gameOverSound.play();
            return true;
        }
    }
    // if snake bump to wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
        gameOverSound.play();
        return true;
    }
}

function gameEngine(){
// part 1: updating the snake array & food
    if(isCollide(snakeArr)){
        moveSound.pause();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any key to play again!");
        score = 0;
        speed = 5;
        scoreBox.innerText = "Score: " + score;
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        
    }

    // if you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
        score += 10;
        scoreBox.innerText = "Score: " + score;
        speed += 0.5;
        if(score > hiscoreval){
            hiscoreval = score;
            winSound.play();
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerText = "HighScore: " + hiscoreval;
        }
    }

    // moving the snake
    for(let i = snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

// part 2: display the snake and food
    board.innerText = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0 ){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// main logic

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1} // start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp" :
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown" :
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft" :
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight" :
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerText = "HighScore: " + hiscore;
}