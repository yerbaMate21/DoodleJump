export class InputHandler {
    constructor(game) {
        this.game = game
        this.bulletCount = 0
        this.keys = []

        window.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {    
                console.log('enter')
                game.gameIsRunning = true  
            } 

            if ((e.key == 'ArrowLeft' || e.key == 'ArrowRight') && (!this.keys.includes(e.key))) {
                this.keys.push(e.key)
            }
        })
        window.addEventListener('keyup', (e) => {
            if ((e.key == 'ArrowLeft' || e.key == 'ArrowRight') && (this.keys.includes(e.key))) {
                this.keys.splice(e.key, 1)
            }

            if (e.key == 'ArrowUp') {
                this.bulletCount++
            }
        })
    }
}