import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update
    }
}

const FLAP_VELOCITY = 250;
let bird = null;


function preload() {
    this.load.image("sky", "./assets/sky.png");
    this.load.image("bird", "./assets/bird.png");
}

function create() {
    this.add.image(0, 0, "sky").setOrigin(0, 0);
    bird = this.physics.add.sprite(config.width / 10, config.height / 2, "bird").setOrigin(0);
    this.input.on('pointerdown', flap, this);
    this.input.keyboard.on('keydown-SPACE', flap, this);
}

function flap()
{
    debugger
    bird.body.velocity.y = -FLAP_VELOCITY;
}


function update() {
}

new Phaser.Game(config);