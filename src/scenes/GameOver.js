class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
         // play and loop gameover background music
         this.gobgm = this.sound.add('gobgm', {
            volume: 1,
            loop: true
         })
        if (!this.musicPlayed) {
            this.gobgm.play()
            this.musicPlayed = true
        }

        // background
        this.graveyard = this.add.tileSprite(0, 0, 0, 0, 'graveyard').setOrigin(0, 0)

        // game over text
        this.add.text(game.config.width / 2, game.config.height / 2, 'Press [M] for Menu \n [C] for Credits \n [R] to Restart', {
            fontSize: '24px',
            fill: '#ffffff', 
            align: 'center'
        }).setOrigin(0.5)

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            if(this.gobgm) {
                this.gobgm.stop()
                this.gobgm.destroy()
            }
            this.scene.start('menuScene')
        }

        // check for R input for restart
        if(Phaser.Input.Keyboard.JustDown(this.keyR)) {
            if(this.gobgm) {
                this.gobgm.stop()
                this.gobgm.destroy()
            }
            this.scene.start('playScene')
        }

        // check for C input for restart
        if(Phaser.Input.Keyboard.JustDown(this.keyC)) {
            if(this.gobgm) {
                this.gobgm.stop()
                this.gobgm.destroy()
            }
            this.scene.start('creditsScene')
        }
    }
}