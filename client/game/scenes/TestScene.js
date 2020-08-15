

export default class TestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestScene' })
    }

    create() {


        // order matters the player loads last so its on top of the other images
        // background
        this.add.image(400, 300, 'sky');
        // add score
        this.score = 0
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

        // platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // Add stars after platforms
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {
            // @ts-ignore
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // allow stars to sit on platforms
        // @ts-ignore
        this.physics.add.collider(this.stars, this.platforms)

        // create map for movement keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // player
        // this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player = this.physics.add.sprite(100, 200, 'knight', 'knight-imgs/walk-down/0001.png');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        // @ts-ignore
        this.physics.add.collider(this.player, this.platforms);
        // allow player to overlap with stars and collect them
        // @ts-ignore
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);



        // let atlasTexture = this.textures.addSpriteSheetFromAtlas('knight', { frameHeight: 48, frameWidth: 32, atlas: "knight", frame: "walk" });


        // player anims
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('knight', {
                start: 1, end: 9, zeroPad: 4,
                prefix: 'walk-left/', suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNames('knight', {
                start: 1, end: 1, zeroPad: 4,
                prefix: 'walk-down/', suffix: '.png'
            }),
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('knight', {
                start: 1, end: 9, zeroPad: 4,
                prefix: 'walk-right/', suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        // add bombs
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, hitBomb, null, this)
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

// HELPER FUNCTIONS

// helper function for player collecting stars to be passed in the collision overlap detection
function collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}


function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
}