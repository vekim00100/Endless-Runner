class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create(data) {
        // play and loop gameover background music
        this.gobgm = this.sound.add('gobgm', {
            volume: 1,
            loop: true
        })
        if(!this.musicPlayed) {
            this.gobgm.play()
            this.musicPlayed = true
        }

        // background
        this.graveyard = this.add.tileSprite(0, 0, 0, 0, 'graveyard').setOrigin(0, 0)

        // game over text
        this.add.text(centerX, centerY, 'Press [M] for Menu \n [C] for Credits \n [R] to Restart', {
            fontSize: '24px',
            fill: '#ffffff', 
            align: 'center'
        }).setOrigin(0.5)

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            color: '#b1f3f4',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 650
        }

        this.add.text(centerX, 10, `Score: ${data.score}`, scoreConfig).setOrigin(0.5, 0).setDepth(1)
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