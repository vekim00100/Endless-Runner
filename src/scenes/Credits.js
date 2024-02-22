class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
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
        this.add.text(centerX, centerY, 'Press [M] for Menu', {
            fontSize: '24px',
            fill: '#ffffff', 
            align: 'center'
        }).setOrigin(0.5)

        // define M key
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }

    update() {
        // check for M input for menu
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            if(this.mm) {
                this.mm.stop()
                this.mm.destroy()
            }
            this.scene.start('menuScene')
        }
    }
}
// main music: https://freesound.org/people/ash_rez/sounds/616329/
// bgm: https://freesound.org/people/betabeats./sounds/650965/
// death sound: https://freesound.org/people/Eponn/sounds/676806/
// game over music: https://pixabay.com/music/video-games-kl-peach-game-over-ii-135684/