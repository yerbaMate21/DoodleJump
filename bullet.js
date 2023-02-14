import { createImage } from "./main.js";
import { Player } from "./player.js";

export class Bullet {
    constructor(player) {
        this.player = player
        this.width = 12
        this.height = 12
        this.x = this.player.x + (this.player.width / 2) - (this.width / 2)
        this.y = this.player.y
        this.velocityY = -15
        this.image = createImage('images/bullet.png')
    }

    update() {
        this.y += this.velocityY
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}