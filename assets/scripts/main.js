let config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1600,
    height: 800,
    rows: 2,
    cols: 4,
    cards: [1, 2, 3, 4],
    timeout: 3,
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

