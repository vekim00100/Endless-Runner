class Grave extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
       super(scene, game.config.width + ghostWidth, Phaser.Math.Between(ghostHeight/2, game.config.height - ghostHeight/2), 'grave')

        this.parentScene = scene

       // add grave object to scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.setVelocityX(velocity)
        this.setImmovable()
        this.newGrave = true
    }

    update() {
        if(this.newGrave && this.x < centerX) {
            this.parentScene.addGrave(this.parent, this.velocity)
            this.newGrave = false
        }

        if(this.x < -this.width) {
            this.destroy()
        }
    }
}