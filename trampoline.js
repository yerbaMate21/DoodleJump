import { createImage } from "./main.js";

export class Trampoline {
    constructor(platform, x, y) {
        this.platform = platform
        this.width = 40
        this.height = 35
        this.x = x
        this.y = y
        this.image = createImage('images/trampoline.png')
    }
    
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}