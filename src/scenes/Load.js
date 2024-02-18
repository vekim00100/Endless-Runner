class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        
        // load graphics assets
        this.load.image('graveyard', 'img/graveyard.png')
        this.load.image('grave', 'img/grave.png')
        this.load.spritesheet('ghost', 'img/ghost.png', {
            frameWidth: 64
        })

        // load audio assets

        // load font
    }

    create() {
        // go to Menu scene
        this.scene.start('menuScene')
    }
}