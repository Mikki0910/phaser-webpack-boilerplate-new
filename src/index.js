import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update
    }
}

const VELOCITY = 200;
let bird = null;
let totalDelta = 0;
let delta = 0;


function preload() {
    this.load.image("sky", "./assets/sky.png");
    this.load.image("bird", "./assets/bird.png");
}

function create() {
    this.add.image(0, 0, "sky").setOrigin(0, 0);
    bird = this.physics.add.sprite(config.width / 10, config.height / 2, "bird").setOrigin(0);
    bird.body.velocity.x = VELOCITY;
}

function update() {
    if(bird.x >= config.width) {
        bird.body.gravity.x = -VELOCITY;
    }
    else if(bird.x <= 0) {
        bird.body.gravity.x = VELOCITY;
    }
}

new Phaser.Game(config);