import { Enemy } from "./enemy.js";
import { InputHandler } from "./input.js";
import { Platform } from "./platform.js";
import { Player } from "./player.js";

export function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image
};

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 600

    // GAME //
    // =========================================
    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.gameIsRunning = false
            this.gameOver = false
            this.platforms = []      
            this.enemies = []     
            this.platformGap = 60
            this.addPlatform() 
            this.addEnemy()
            this.score = 0
            // 
            this.inputHandler = new InputHandler(this)
            this.platform = new Platform(this)
            this.player = new Player(this)
            this.enemy = new Enemy(this)
        }

        update() {
            this.platforms.forEach((platform) => {
                platform.update()
            })
            this.player.update(this.inputHandler)
            this.enemies.forEach((enemy) => {
                enemy.update()
            })       
        }

        draw(ctx) {
            ctx.drawImage(createImage('images/background.png'), 0, 0)

            if (!this.gameIsRunning) {
                ctx.font = 'bold 25px Helvetica'
                ctx.fillStyle = 'black'
                ctx.textAlign = 'center'
                ctx.fillText(`PRESS ENTER TO START`, this.width * 0.5, this.height * 0.5)
            } 

            // game start
            else {
                this.platforms.forEach((platform) => {
                    platform.draw(ctx)
                })
                this.player.draw(ctx)
                this.enemies.forEach((enemy) => {
                    enemy.draw(ctx)
                })
                //
                ctx.fillStyle = 'black'
                ctx.font = 'bold 22px Arial'
                ctx.textAlign = 'start'
                ctx.fillText(`Score: ${this.score}`, 10, 30)

                // game over
                if (this.gameOver) {
                    ctx.font = 'bold 35px Helvetica'
                    ctx.fillStyle = 'black'
                    ctx.textAlign = 'center'
                    ctx.fillText(`GAME OVER`, this.width * 0.5, this.height * 0.5)
                    ctx.font = 'bold 20px Helvetica'
                    ctx.fillStyle = '#353535'
                    ctx.textAlign = 'center'
                } 
            }
        }

        addPlatform(plat_Y, type) {
            do (
                this.platforms.unshift(new Platform(this, plat_Y, type))
            )
            while (this.platforms[0].y >= plat_Y)
        }

        addEnemy() {
            do (
                this.enemies.unshift(new Enemy(this))
            )
            while (this.enemies[0].y >= 100)
        }

        levelUp() {
            this.player.jump += 0.1 // ?
            this.platformGap += 10  // ?
            if (this.platform.type == 'blue') {
                this.platform.velocityX * 1.5
            }
        }
    }; 
    // =========================================================

    const game = new Game(canvas.width, canvas.height)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (game.gameIsRunning) game.update()
        game.draw(ctx)
        if (!game.gameOver) requestAnimationFrame(animate) 
    };

    animate();
});