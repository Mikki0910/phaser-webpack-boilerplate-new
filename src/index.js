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
const pipeHorizontalDistanceRange = [300, 350];

const PIPES_TO_RENDER = 4;
let pipeHorizontalDistance = 0;
let bird = null;
let pipes = null;
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

    pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
        let upperPipe = pipes.create(0, 0, "pipe").setOrigin(0, 1);
        let lowerPipe = pipes.create(0, 0, "pipe").setOrigin(0, 0);
        placePipe.call(this, upperPipe, lowerPipe);
    }

    pipes.setVelocityX(-200);

    this.input.on('pointerdown', flap, this);
    this.input.keyboard.on('keydown-SPACE', flap, this);
}


function flap() {
    debugger
    bird.body.velocity.y = -FLAP_VELOCITY;
}

function placePipe(uPipe, lPipe) {
    pipeHorizontalDistance += 400;
    const rightMostX = getRightMostPipe();
    let pipeVerticalDistance = Phaser.Math.Between(pipeVerticalDistanceRange[0], pipeVerticalDistanceRange[1]);
    let pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);
    let thisPipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange); // renamed

    uPipe.x = rightMostX + thisPipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;

    uPipe.body.velocity.x = -200;
    lPipe.body.velocity.x = -200;
}



function update() {
    if (bird.y > config.height || bird.y < -config.height) {
        restartPlayerPosition();
    }
}

function getRightMostPipe() {
    let rightMostX = 0;
    pipes.getChildren().forEach(function(pipe){
        rightMostX = Math.max(pipe.x, rightMostX);
    })
    return rightMostX;
}


function restartPlayerPosition() {
    bird.x = initialBirdPosition.x;
    bird.y = initialBirdPosition.y;
    bird.body.velocity.y = 0;
}

new Phaser.Game(config);