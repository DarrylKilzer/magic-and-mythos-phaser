let sky = './game/assets/sprites/sky.png'
let bomb = './game/assets/sprites/bomb.png'
let ground = './game/assets/sprites/platform.png'
let dude = './game/assets/sprites/dude.png'
let character = './game/assets/spritesheets/character.png'
let star = './game/assets/sprites/star.png'
let thudMp3 = './game/assets/sounds/thud.mp3'
let thudOgg = './game/assets/sounds/thud.ogg'


export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {


        // IMAGES
        this.load.image('sky', sky)
        this.load.image('bomb', bomb)
        this.load.image('ground', ground);
        this.load.image('star', star);

        // CHARACTERS
        // this.load.spritesheet('dude',
        //     dude,
        //     { frameWidth: 32, frameHeight: 48 }
        // );
        this.load.multiatlas('knight', './game/assets/sprites/knight.json', './game/assets/sprites');

        // SOUNDS
        this.load.audio('thud', [thudMp3, thudOgg])
    }
    create() {
        this.scene.start('TestScene')
    }
}