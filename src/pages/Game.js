const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

// total score
let score = 0;

// timer + text
let timer = 120;
let mins, secs;
(parseInt(timer / 60) < 10) ? mins = `0${parseInt(timer / 60)}` : mins = `${parseInt(timer / 60)}`;
((timer % 60) < 10) ? secs = `0${(timer % 60)}` : secs = `${(timer % 60)}`;
setInterval(setTime, 1000);
function setTime(){
    timer--;
    ((timer % 60) < 10) ? secs = '0' : secs = '';
    secs += `${timer % 60}`;
    // (parseInt(timer / 60) < 10) ? mins = '0' : mins = '';
    mins = `${parseInt(timer / 60)}`
}

// images
const imgCat = new Image();
const imgBG = new Image();
c.imageSmoothingEnabled = false;

//length fishing line
let lineLength = 70;
c.lineWidth = 4;

//cat
let cat = {
    size: 50,
    speed: 3.2,
    x: document.getElementById("canvas").width / 2,
    y: 251,
    vxl: 0,
    vxr: 0,
    vyu: 0,
    vyd: 0
}
let catSize = 50;
let speed = 3.2;
let x = document.getElementById("canvas").width / 2;
let y = 251;
let vxl = 0;
let vxr = 0;
let vyu = 0;
let vyd = 0;

//boat
let boat = {
    width: 600,
    height: 100
}
boatWidth = 600;
boatHeight = 100;

//fish
let fishArray = [];
let startTime = Date.now();
let lastSpawn = -1;
let spawnRate = 1500;
let maxFish = 10;

//left & right boundaries of boat
let left = ((canvas.width) - (boatWidth)) / 2;
let right = left + boatWidth;

//drawing images
imgCat.onload = draw;
imgCat.src = '/src/assets/cat.png';
imgBG.onload = draw;
imgBG.src = '/src/assets/bg.png';

function loadBG(){
    
}

// const bg = new Image(); bg.onload = draw; bg.src = 'background.jpg';
// let background = canvas.getContext("2d"); background.drawImage(bg,0,0, 10,10);
function draw() {
    // background
    // c.drawImage(imgBG, 0,-100, canvas.width, canvas.height+200);
    
    // fishsection
    c.fillStyle = "#68B2B4"
    c.fillRect(left, 300+boatHeight, boatWidth, 200);
    
    // boat
    c.fillStyle = "#DDDDDD";
    c.fillRect(left, 300, boatWidth, boatHeight);
    
    // cat
    c.drawImage(imgCat, x, y, catSize, catSize);
    
    // fishing line
    c.beginPath();
    c.moveTo(x+50, y);
    c.lineTo(x+50, y+lineLength);
    c.closePath();
    c.stroke();

    // fishing hook
    c.fillStyle = "#555555"
    c.fillRect(x+45,y+lineLength,10,10);

    // score
    c.font = "36px serif";
    c.fillText(`Score: ${score}`, 25, 50);

    // timer
    c.fillText(`${mins}:${secs}`, 600, 50)
    
    //spawning fish
    if (Date.now() > (lastSpawn + spawnRate)){
        lastSpawn = Date.now();
        spawnFish();
    }
}

function update(){
    c.clearRect(0,0,canvas.width,canvas.height);
    x -= vxl;
    x += vxr;
    lineLength -= vyu;
    lineLength += vyd;
    draw();
    collision();

    requestAnimationFrame(update);

    for (var i = 0; i < fishArray.length; i++){
        var f = fishArray[i];
        // makes fish turn opposite direction when hitting fishSection wall
        if (f.x < left || f.x > right){
            f.speed *= -1;
        }
        // checks if fish was touched by hook
        if ((x+40 < f.x && f.x < x+55) && (y+lineLength-5 < f.y && f.y < y+lineLength+10)){
            fishArray.splice(fishArray.indexOf(f), 1);
            score += 10;
        }

        // moves & draws fish
        f.x += f.speed;
        c.fillStyle = "Black";
        c.fillRect(f.x, f.y, 5, 5);
    }
}

function collision(){
    if (x <= left){ x = left; }
    if (x >= right - catSize){ x = right - catSize; }
    if (lineLength <= 70){ lineLength = 70; }
    if (lineLength >= canvas.height - 280){ lineLength = canvas.height - 280; }
}

function spawnFish(){
    if (fishArray.length < maxFish){
        //decides if fish spawns left or right
        let fishPosition;
        let fishSpeed;
        if (Math.random() < 0.50) { fishPosition = left; fishSpeed = 0.50 }
        else { fishPosition = right; fishSpeed = -0.50 }

        let fish = {
            x: fishPosition,
            y: Math.random() * 200 + (300+boatHeight),
            speed: fishSpeed,
            ctx: canvas.getContext("2d")
        }
        fishArray.push(fish);
    }
}

update();

addEventListener("keydown", function(e){
    if (e.code == 'KeyD' || e.code == 'ArrowRight'){ vxr = speed; }
    if (e.code == 'KeyA' || e.code == 'ArrowLeft'){ vxl = speed; }
    if (e.code == 'KeyW' || e.code == 'ArrowUp'){ vyu = speed; }
    if (e.code == 'KeyS' || e.code == 'ArrowDown'){ vyd = speed; }
})
addEventListener("keyup", function(e){
    if (e.code == 'KeyD' || e.code == 'ArrowRight'){ vxr = 0; }
    if (e.code == 'KeyA' || e.code == 'ArrowLeft'){ vxl = 0; } 
    if (e.code == 'KeyW' || e.code == 'ArrowUp'){ vyu = 0; }
    if (e.code == 'KeyS' || e.code == 'ArrowDown'){ vyd = 0; }
})