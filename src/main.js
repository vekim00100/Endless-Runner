// "Endless Runner Title"
// Vivian Kim
// Apro Hrs Spent on project

'use strict'

// game config
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    render: {
        pixelArt: true
    },
    backgroundColor: 0xff0000,
    scale: {
        autoCenter: Phaser.Scale.CENTER // centers the screen
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Menu, Play, GameOver, Credits ]
}

// define game
let game = new Phaser.Game(config)

// define globals
let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

const ghostWidth = 50
const ghostHeight = 64
const ghostVelocity = 15

let cursors
let { height, width } = game.config
