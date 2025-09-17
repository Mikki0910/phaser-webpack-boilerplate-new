import Phaser from "phaser";

const config = {
    // WebGL(Web graphics library) JS Api fro rendering 2D and 3D graphics
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin, manages physics simulation
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update
    }
}

let bird = null;
let totalDelta = 0;
let delta = 0;


//Loading assets, such as images, music, animations...
function preload() {
    // 'this' context - scene
    //containas functions and properties we can use
    this.load.image("sky", "./assets/sky.png");
    this.load.image("bird", "./assets/bird.png");
}

function create() {
    //x, y, key
    this.add.image(0, 0, "sky").setOrigin(0, 0);
    bird = this.physics.add.sprite(config.width / 10, config.height / 2, "bird").setOrigin(0);
}

//60 fps
function update() {

    if (totalDelta >= 1000) {
        console.log(bird.body.velocity.y);
        totalDelta = 0;
    }

    totalDelta += delta;
}

new Phaser.Game(config);