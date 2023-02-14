import { createImage } from "./main.js"
import { Platform } from "./platform.js";
import { Bullet } from "./bullet.js"
import { Trampoline } from "./trampoline.js";

export class Player {
    constructor(game) {
        this.game = game
        this.x = 200
        this.y = 250
        this.width = 60
        this.height = 60
        this.velocityX = 0
        this.velocityY = 0
        this.speed = 5
        this.gravity = 0.15
        this.jump = 3.8
        this.image = createImage('images/doodle_right.png')
        this.bullets = []
        this.trampoline = new Trampoline(this)
    }

    update(inputHandler) {
        this.x += this.velocityX
        this.y += this.velocityY
        this.velocityY += this.gravity 

        if (inputHandler.keys.includes('ArrowLeft')) {
            this.velocityX = -this.speed
            this.image = createImage('images/doodle_left.png')
        } 
        else if (inputHandler.keys.includes('ArrowRight')) {
            this.velocityX = this.speed
            this.image = createImage('images/doodle_right.png')
        }
        else this.velocityX = 0 
        
        // sides collisison
        if (this.x + (this.width / 2) >= this.game.width) this.x = 0 - (this.width / 2)
        else if (this.x  + (this.height / 2) < 0) this.x = this.game.width - (this.height / 2)

        // game over   
        if (this.y > this.game.height) {
            new Audio('sounds/fall.mp3').play()
            this.game.gameOver = true
        } 

        // bullet
        if (inputHandler.bulletCount > 0) {
            inputHandler.bulletCount--
            this.bullets.push(new Bullet(this))
            new Audio('sounds/bullet.mp3').play()
        }
        this.bullets.forEach((bullet) => bullet.update())
    }

    draw(ctx) {
        this.bullets.forEach((bullet) => bullet.draw(ctx))
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}
