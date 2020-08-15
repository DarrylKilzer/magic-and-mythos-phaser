import BootScene from './scenes/BootScene.js'
import TestScene from './scenes/TestScene.js';


function launch(containerId) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerId,

        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: [BootScene, TestScene]
    }).scene.start('BootScene')
}

export { launch }

