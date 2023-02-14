import { createImage } from "./main.js";

export class Enemy {
    constructor(game) {
        this.game = game
        this.width = 70
        this.height = 70
        this.x = Math.floor(Math.random() * (this.game.width - this.width))
        this.y = Math.floor(Math.random() * - 1000) - 500
        this.velocityX = 2
        this.velocityY = 0
        this.image = createImage('images/alien.png')
        this.audio = new Audio('sounds/alien.mp3')
    }

    update(enemy_Y) {
        this.x += this.velocityX
        this.y += this.velocityY

        if (this.game.enemies[0].y >= this.game.height * 8) {
            this.game.addEnemy(enemy_Y)
        }

        // sides collision
        if (this.x + this.width >= 400 || this.x <= 0) {
            this.velocityX *= -1
        } 

        // vertical movement
        if (this.game.player.velocityY < 0) {
            this.velocityY = -this.game.player.velocityY * 1.5
        }
        else this. velocityY = 0

        // player - enemy collisison
        if (this.game.player.x + this.game.player.width - 35 >= this.x &&
            this.game.player.x + 35 <= this.x + this.width &&
        
            this.game.player.y + this.game.player.height - 15 >= this.y &&
            this.game.player.y + 15 <= this.y + this.height) {
                this.game.gameOver = true  
                new Audio('sounds/no_jump.mp3').play()
        }

        // bullet - enemy collision
        let bullets = this.game.player.bullets
        bullets.forEach((bullet) => {
            if (bullet.x < this.x + this.width && bullet.x  + bullet.width > this.x && bullet.y < this.y + this.height && bullet.height + bullet.y > this.y) {
                this.width = 0 
                this.height = 0 
                this.x = -100 
                new Audio('sounds/no_jump.mp3').play()
            }
        })

        if (this.y >= -200) this.audio.play() 
        if (this.y >= this.game.height) this.audio.pause()
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}
