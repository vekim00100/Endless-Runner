class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // graveyard scrolling speed
        this.gameSpeed = 8

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

        // enable physics for ghost
        this.physics.world.enable(this.ghost)

        // Add collision between the ghost and graves
        this.physics.add.collider(this.ghost, this.graveGroup, this.graveCollision, null, this)
    }
    
    addGrave() {
        let speedVary = Phaser.Math.Between(500, 500)
        let grave = new Grave(this, ghostVelocity - speedVary)
        this.graveGroup.add(grave)
        }
    
    update() {
        // movement keys
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

        this.graveGroup.children.iterate((grave) => {
            grave.update()
        })
    }

    graveCollision(ghost, grave) {
        this.sound.play('death', { volume: 0.5 })

        ghost.destroyed = true

        this.time.delayedCall(1500, () => {
            this.scene.start('gameOverScene')
        })
    }
}
