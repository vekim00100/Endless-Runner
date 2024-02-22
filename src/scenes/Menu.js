class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
         // play and loop gameover background music
         this.mm = this.sound.add('mm', {
            volume: 1,
            loop: true
        })
        if(!this.musicPlayed) {
            this.mm.play()
            this.musicPlayed = true
        }

        // background
        this.graveyard = this.add.tileSprite(0, 0, 0, 0, 'graveyard').setOrigin(0, 0)

        // game over text
        this.add.text(centerX, centerY, 'Press [ARROW UP] to Play', {
            fontSize: '24px',
            fill: '#ffffff', 
            align: 'center'
        }).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // go to Play scene
         if(cursors.up.isDown) {
            if(this.mm) {
                this.mm.stop()
                this.mm.destroy()
            }
            this.scene.start('playScene')
        }
    }   
}