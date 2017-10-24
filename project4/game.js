var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let width = c.width, height = c.height;
let score = 0, lives = 3;
let harmposx = Math.floor((Math.random() * width-18) + 18), harmposy = 0;

let rand = Math.floor((Math.random() * width-18) + 18);
while (rand >= harmposx-28 && rand <= harmposx+28)
    rand = Math.floor((Math.random() * width-18) + 18);
    
let benefitposx = rand, benefitposy = 0;
let playerposx = (width/2)-40;

let img = new Image();
img.src = "pacman2.png";

window.onload = () => {
    ctx.font = "28px Arial";
    
    window.addEventListener('keydown', (e) => {
        if (e.which === 37)
            playerposx -= 24;
        else if (e.which === 39)
            playerposx += 24;
    });
};

function reset() {
    ctx.clearRect(0, 0, c.width, c.height);
    lives = 3;
    score = 0;
    harmposx = Math.floor((Math.random() * width-18) + 18), harmposy = 0;

    rand = Math.floor((Math.random() * width-18) + 18);
    while (rand >= harmposx-28 && rand <= harmposx+28)
        rand = Math.floor((Math.random() * width-18) + 18);
        
    benefitposx = rand, benefitposy = 0;

    window.requestAnimationFrame(update);
    
}

function update() {
    ctx.clearRect(0, 0, c.width, c.height);
    
    ctx.fillStyle = 'black';
    ctx.fillText("Score: " + score, 14, 34);
    ctx.fillText("Lives: " + lives, width-110, 34);
    
    // player movements
    if (playerposx <= 0)
        playerposx = 0;
    if (playerposx >= c.width-88)
        playerposx = c.width-88;
    ctx.drawImage(img, playerposx, height-88);
    
    // harm movements
    if (harmposy >= c.height+18) {
        harmposx = Math.floor((Math.random() * width-18) + 18);
        harmposy = -18;
    }
    ctx.beginPath();
    ctx.arc(harmposx, harmposy-18, 18, 0, 2*Math.PI);
    ctx.fillStyle = '#ff4747';
    ctx.font = "28px Arial";
    ctx.fill();
    
    // benefit movements
    if (benefitposy >= c.height+18) {
        benefitposy = -18;
        rand = Math.floor((Math.random() * width-18) + 18);
        while (rand >= harmposx-28 && rand <= harmposx+28)
            rand = Math.floor((Math.random() * width-18) + 18);
        benefitposx = rand;
    }
    ctx.beginPath();
    ctx.arc(benefitposx, benefitposy-18, 18, 0, 2*Math.PI); 
    ctx.fillStyle = '#89f442';
    ctx.font = "28px Arial";
    ctx.fill();
    
    harmposy += 3;
    benefitposy += 3;
    
    // benefit collision
    var dx = playerposx+22 - benefitposx;
    var dy = height-44 - benefitposy;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 44 + 18) {
        score+=1;
        rand = Math.floor((Math.random() * width-18) + 18);
        while (rand >= harmposx-28 && rand <= harmposx+28)
            rand = Math.floor((Math.random() * width-18) + 18);
        benefitposx = rand;
        benefitposy = -18;
    }
    
    // harm collision
    dx = playerposx+22 - harmposx;
    dy = height-44 - harmposy;
    distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 44 + 18) {
        lives-=1;
        harmposx = Math.floor((Math.random() * width-18) + 18);
        harmposy = -18;
    }
    
    // game over
    if (lives <= 0) {
        ctx.fillStyle = 'red';
        ctx.font = "40px Arial";
        ctx.fillText("Game Over. Restarting in 3 seconds", c.width/2-300, 150);
        setTimeout(function() {
            reset();
        }, 3000);
    }
    
    else {window.requestAnimationFrame(update)};
}

window.requestAnimationFrame(update);