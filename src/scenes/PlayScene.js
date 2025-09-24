import Phaser from "phaser";

const FLAP_VELOCITY = 250;
const PIPE_VERTICAL_RANGE = [150, 250];
const PIPE_HORIZONTAL_RANGE = [300, 350];
const PIPES_TO_RENDER = 4;

class PlayScene extends Phaser.Scene {
    constructor(config) {
        super("PlayScene");
        this.sharedConfig = config;
        this.bird = null;
        this.pipes = null;
        this.pipeHorizontalDistance = 0;
    }

    preload() {
        this.load.image("sky", "./assets/sky.png");
        this.load.image("bird", "./assets/bird.png");
        this.load.image("pipe", "./assets/pipe.png");
    }

    create() {
        this.createBG();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.handleInputs();
    }


    createBG() {
        this.add.image(0, 0, "sky").setOrigin(0, 0);
    }

    createBird() {
        this.bird = this.physics.add
            .sprite(
                this.sharedConfig.startPosition.x,
                this.sharedConfig.startPosition.y,
                "bird"
            )
            .setOrigin(0);
        this.bird.body.gravity.y = 400;
        this.bird.setCollideWorldBounds(true);
    }

    createPipes() {
        this.pipes = this.physics.add.group();
        for (let i = 0; i < PIPES_TO_RENDER; i++) {
            let upperPipe = this.pipes.create(0, 0, "pipe")
                .setOrigin(0, 1)
                .setImmovable(true);

            let lowerPipe = this.pipes.create(0, 0, "pipe")
                .setOrigin(0, 0)
                .setImmovable(true);
            this.placePipe(upperPipe, lowerPipe);
        }
        this.pipes.setVelocityX(-200);
    }

    handleInputs() {
        this.input.on("pointerdown", this.flap, this);
        this.input.keyboard.on("keydown-SPACE", this.flap, this);
    }

    update() {
        this.checkGameStatus();
        this.recyclePipes();
    }

    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    checkGameStatus() {
        if (this.bird.getBounds().bottom >= this.sharedConfig.height || this.bird.y <= 0) {
            this.gameOver();
        }
    }

    flap() {
        this.bird.body.velocity.y = -FLAP_VELOCITY;
    }

    placePipe(uPipe, lPipe) {
        this.pipeHorizontalDistance += 400;
        const rightMostX = this.getRightMostPipe();

        let pipeVerticalDistance = Phaser.Math.Between(...PIPE_VERTICAL_RANGE);
        let pipeVerticalPosition = Phaser.Math.Between(
            20,
            this.sharedConfig.height - 20 - pipeVerticalDistance
        );
        let thisPipeHorizontalDistance = Phaser.Math.Between(
            ...PIPE_HORIZONTAL_RANGE
        );

        uPipe.x = rightMostX + thisPipeHorizontalDistance;
        uPipe.y = pipeVerticalPosition;

        lPipe.x = uPipe.x;
        lPipe.y = uPipe.y + pipeVerticalDistance;

        uPipe.body.velocity.x = -200;
        lPipe.body.velocity.x = -200;
    }

    recyclePipes() {
        const tempPipes = [];
        this.pipes.getChildren().forEach((pipe) => {
            if (pipe.getBounds().right <= 0) {
                tempPipes.push(pipe);
                if (tempPipes.length === 2) {
                    this.placePipe(...tempPipes);
                }
            }
        });
    }

    getRightMostPipe() {
        let rightMostX = 0;
        this.pipes.getChildren().forEach((pipe) => {
            rightMostX = Math.max(pipe.x, rightMostX);
        });
        return rightMostX;
    }

    gameOver() {
        // this.bird.x = this.sharedConfig.startPosition.x;
        // this.bird.y = this.sharedConfig.startPosition.y;
        // this.bird.body.velocity.y = 0;
        this.physics.pause();
        this.bird.setTint(0xEE4824);
    }
}

export default PlayScene;
