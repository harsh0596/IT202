var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let width = 1024, height = 576;
let score = 0, lives = 3;
let player, harm, benefit;
let playerposx = 60;

window.onload = () => {
    setInterval(update, 1000/60);
    
    ctx.font = "28px Arial";
    ctx.fillText("Score: " + score, 14, 34);
    ctx.fillText("Lives: " + lives, width-110, 34);
    
    window.addEventListener('keydown', (e) => {
        if (e.which === 37)
            playerposx -= 5;
        else if (e.which === 39)
            playerposx += 5;
    });
};

function update() {
    
    ctx.fillStyle = 'cyan';
    ctx.fillRect((width/2)-40, height-40, playerposx, 40);
}