class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // credits config
        let credConfig = {
            fontFamily: 'Courier',
            fontSize: '55px',
            color: '#c1fff2',
            align: 'center'
        }
        // add text for directions
        this.add.text(game.config.width/2 + 36, 743, 'Press [M] for Menu', credConfig).setOrigin(0.5)

        // define M key
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }

    update() {
        // check for M input for menu
        if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start('menuScene')
        }
    }
}
// bgm: https://freesound.org/people/betabeats./sounds/650965/
// death sound: https://freesound.org/people/Eponn/sounds/676806/
// game over music: https://pixabay.com/music/video-games-kl-peach-game-over-ii-135684/