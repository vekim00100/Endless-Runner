class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar from PaddleParkour
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()
            loadingBar.fillStyle(0X0FFFF, 1)
            loadingBar.fillRect(0, centerY - 75, w * value, 60)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.path = './assets/'
        
        // load graphics assets
        this.load.image('graveyard', 'img/graveyard.png')
        this.load.image('grave', 'img/grave.png')
        this.load.spritesheet('ghost', 'img/ghost.png', {
            frameWidth: 64
        })

        // load audio assets
        this.load.audio('death', 'audio/death.wav')
        this.load.audio('bgm', 'audio/bgm.wav')
        this.load.audio('gobgm', 'audio/gameover.mp3')

        // load font
    }

    create() {
        // go to Menu scene
        this.scene.start('menuScene')
    }
}