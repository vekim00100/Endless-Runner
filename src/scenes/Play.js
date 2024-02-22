class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // initialize score
        this.score = 0

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

        // game over text
        this.scoreText = this.add.text(centerX, 10, `Score: ${this.score}`, scoreConfig).setOrigin(0.5, 0).setDepth(1)

        // play and loop background music
        this.bgm = this.sound.add('bgm', {
            volume: 1,
            loop: true
        })
        if(!this.musicPlayed) {
            this.bgm.play()
            this.musicPlayed = true
        }

        // graveyard scrolling speed
        this.gameSpeed = 5

        this.graveSpeed = -600

        // background
        this.graveyard = this.add.tileSprite(0, 0, 0, 0, 'graveyard').setOrigin(0, 0)

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

        // ghost sprite
        this.ghost = this.physics.add.sprite(64, centerY, 'ghost').setOrigin(0.5)
        this.ghost.body.setCollideWorldBounds(true)
        this.ghost.setImmovable()
        this.ghost.body.setSize(50, 64).setOffset(6, 0)
        this.ghost.destroyed = false

        // set up grave group
        this.graveGroup = this.add.group({
            runChildUpdate: true
        })

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()

        this.time.delayedCall(1000, () => {
            this.addGrave()
        })

        this.ghostCollided = false

        // enable physics for ghost
        this.physics.world.enable(this.ghost)

        // Add collision between the ghost and graves
        this.physics.add.collider(this.ghost, this.graveGroup, this.graveCollision, null, this)
    
        // initalize variabled related to game state
        this.startTime = 0
        this.difficultyIncreased = false
        this.musicPlayed = false
    }
    
    addGrave() {
        let grave = new Grave(this, this.graveSpeed)
        this.graveGroup.add(grave)
        }
    
    update() {
        if(!this.startTime) {
            this.startTime = this.time.now
        }

        // update score based on elapsed time
        if(!this.ghost.destroyed) {
            const elapsedTime = this.time.now - this.startTime
            this.score = Math.floor(elapsedTime / 100)

            // display updated score
            this.scoreText.setText('Score: ' + this.score)

             // increase difficulty after 17 seconds 
            if(elapsedTime > 17000 && !this.difficultyIncreased) {
                this.gameSpeed += 2
                this.graveSpeed -= 240
                this.difficultyIncreased = true

                // adjust the delay value
                this.time.delayedCall(500, () => {
                    this.addGrave()
                })
            }
        }

        // movement keys
        if(!this.ghost.destroyed) {
            if(cursors.up.isDown) {
                this.ghost.body.velocity.y -= ghostVelocity
            } else if(cursors.down.isDown) {
                this.ghost.body.velocity.y += ghostVelocity
            }
        }

        // Disable further collisions until the game restarts
        if(!this.ghost.destroyed && this.ghostCollided) {
            this.ghostCollider.active = false
        }

        // graveyard scrolling
        this.graveyard.tilePositionX += this.gameSpeed

        // ghost move animation
        this.ghost.play('ghost-move', true)

        this.graveGroup.children.iterate((grave) => {
            grave.update()
        })
    }

    graveCollision(ghost, grave) {
        if(!this.ghostCollided) {
            this.sound.play('death', { volume: 1 })
            this.bgm.stop()
            this.musicPlayed = false

            this.ghostCollided = true
            ghost.destroyed = true

            this.time.delayedCall(1500, () => {
                // pass the score to the gamerOver scene
                this.scene.start('gameOverScene', { score: this.score } )
        })
        }
    }
}
