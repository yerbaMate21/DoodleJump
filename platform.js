import { createImage } from "./main.js";
import { Trampoline } from "./trampoline.js";

export class Platform {
    constructor (game, plat_Y, type) {
        this.game = game
        this.width = 90
        this.height = 15
        this.x = Math.floor(Math.random() * (this.game.width - this.width))
        this.y = this.calcY(plat_Y) 
        this.velocityX = 1
        this.velocityY = 0
        this.type = this.calcType(type)
        this.trampoline = new Trampoline(this)
        this.addTrampoline()
        this.image = createImage(`images/${this.type}_platform.png`)
    }

    update() {
        this.x += this.velocityX
        this.y += this.velocityY

        if (this.game.platforms[0].y >= 0) {
            this.game.addPlatform(-this.game.height)
            this.game.levelUp()
        } 

        if ((this.type == 'blue' && this.x + 90 >= 400) || (this.type == 'blue' && this.x <= 0)) {
            this.velocityX *= -1
        } 
        else if (this.type == 'green' || this.type == 'white' || this.type == 'brown') {
            this.velocityX = 0
        }

        if (this.game.player.velocityY < 0) {
            this.velocityY = -this.game.player.velocityY * 1.3
            this.game.score +=  Math.round(this.velocityY / 10)  // score update
        } 
        else {
            this.velocityY = 0
        }

        // player - platform collision
        if (this.game.player.x + this.game.player.width - 10 >= this.x &&
            this.game.player.x + 10 <= this.x + this.width &&
            this.game.player.y + this.game.player.height <= this.y &&
            this.game.player.y + this.game.player.height + this.game.player.velocityY >= this.y)  
            {
                this.game.player.velocityY = -this.game.player.jump

                // crash the brown platform
                if (this.type == 'brown') { 
                    this.width = 0 
                    this.height = 0 
                    this.x = -100 
                    new Audio('sounds/crash.mp3').play()
                }
                if (this.type == 'white') {
                    this.y += 25
                    new Audio('sounds/jump.wav').play()
                } else if (this.type == 'blue' || this.type == 'green') {
                    new Audio('sounds/jump.wav').play()
                }
        }   

        this.addTrampoline()

        // player - trampoline colisison
        if (this.game.player.x + this.game.player.width - 10 >= this.trampoline.x &&
            this.game.player.x + 10 <= this.trampoline.x + this.trampoline.width &&
            this.game.player.y + this.game.player.height <= this.trampoline.y &&
            this.game.player.y + this.game.player.height + this.game.player.velocityY >= this.trampoline.y) {
                this.game.player.velocityY = -this.game.player.jump * 1.8 
                new Audio('sounds/single_jump.mp3').play()
            }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        this.trampoline.draw(ctx)
    }
    
    calcY(plat_Y) {
        if (this.game.platforms.length == 0) {
            return this.game.height // 600
        } 
        else {
            return this.game.platforms[0].y - this.game.platformGap
        }
    }

    calcType(type) {
            let multiplier = 4 

            if (this.game.platforms.length % multiplier == Math.floor(Math.random() * multiplier)) return 'white'
            else if (this.game.platforms.length % multiplier == Math.floor(Math.random() * multiplier)) return 'blue'
            else if (this.game.platforms.length % Math.floor(Math.random() * multiplier)) return 'brown'
            else return 'green' 
    }

    addTrampoline() {
        if ((this.type == 'green' || this.type == 'white') &&   
            ((this.x > 20 && this.x < 50) || 
            (this.x > 140 && this.x < 170) || 
            (this.x > 280 && this.x < 310))) {
                this.trampoline = new Trampoline(this, this.x + 5, this.y - 23)
        }
    }
}