let scene = new.Phaser.Scene('Game');

scene.preload = function () {
    // 1. Dounload background.

};

scene.create = function () {
    // 2. Show background.

}



let config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1200,
    height: 720,
    scene: scene,
}
let game = new Phaser.Game(config);