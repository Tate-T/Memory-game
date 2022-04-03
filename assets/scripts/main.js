let config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1200,
    height: 720,
    rows: 2,
    cols: 4,
    scene: new GameScene(),
}
let game = new Phaser.Game(config);

// let scene = new GameScene();

// let config = {
//     type: Phaser.AUTO, // webgl or canvas
//     width: 1200,
//     height: 720,
//     rows: 2,
//     cols: 4,
//     scene: scene,
// }
// let game = new Phaser.Game(config);

