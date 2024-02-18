class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.gameSpeed = 10

        // create animations for ghost
        this.anims.create({
            key: 'ghost-move',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('ghost', {
                start: 0,
                end: 3
            })
        })

        // background
        this.graveyard = this.add.tileSprite(0, 0, 0, 0, 'graveyard').setOrigin(0, 0)
        

        // ghost sprite
        this.ghost = this.physics.add.sprite(64, centerY, 'ghost').setOrigin(0.5)
        this.ghost.body.setCollideWorldBounds(true)
        this.ghost.body.setSize(50, 64).setOffset(6, 0)
        this.ghost.destroyed = false

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()
    }
    
    update() {
        if(!this.ghost.destroyed) {
            if(cursors.up.isDown) {
                this.ghost.body.velocity.y -= ghostVelocity
            } else if(cursors.down.isDown) {
                this.ghost.body.velocity.y += ghostVelocity
            }
        }

        // graveyard scrolling
        this.graveyard.tilePositionX += this.gameSpeed

        // ghost move animation
        this.ghost.play('ghost-move', true)
    }
}
