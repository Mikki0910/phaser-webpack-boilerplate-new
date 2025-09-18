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

const FLAP_VELOCITY = 250;
const initialBirdPosition = {x: config.width / 10, y: config.height / 2};
const pipeVerticalDistanceRange = [150, 250];
const PIPES_TO_RENDER = 4;
let pipeHorizontalDistance = 0;
let bird = null;
let upperPipe = null;
let lowerPipe = null;


function preload() {
    this.load.image("sky", "./assets/sky.png");
    this.load.image("bird", "./assets/bird.png");
    this.load.image("pipe", "./assets/pipe.png");
}

function create() {
    this.add.image(0, 0, "sky").setOrigin(0, 0);
    bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, "bird").setOrigin(0);
    bird.body.gravity.y = 400;

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
        pipeHorizontalDistance += 400;
        let pipeVerticalDistance = Phaser.Math.Between(pipeVerticalDistanceRange[0], pipeVerticalDistanceRange[1]);
        let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);
        upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, "pipe").setOrigin(0, 1);
        lowerPipe = this.physics.add.sprite(pipeHorizontalDistance, upperPipe.y + pipeVerticalDistance, "pipe").setOrigin(0, 0);

        upperPipe.body.velocity.x = -200;
        lowerPipe.body.velocity.x = -200;
    }

    this.input.on('pointerdown', flap, this);
    this.input.keyboard.on('keydown-SPACE', flap, this);
}

function flap() {
    debugger
    bird.body.velocity.y = -FLAP_VELOCITY;
}


function update() {
    if (bird.y > config.height || bird.y < -config.height) {
        restartPlayerPosition();
    }
}

function restartPlayerPosition() {
    bird.x = initialBirdPosition.x;
    bird.y = initialBirdPosition.y;
    bird.body.velocity.y = 0;
}

new Phaser.Game(config);