let scene = new Phaser.Scene('Game');

scene.preload = function () {
    // 1. Dounload background.
    this.load.image('bg', 'assets/sprites/background.png');
    this.load.image('card', 'assets/sprites/card.png');
};

scene.create = function () {
    // 2. Show background.
    // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

    let positions = this.getCardsPosition();
    for (let position of positions) {
        this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);
    }
};

scene.getCardsPosition = function () {
    let cardsPosition = [];
    let cardWidth = 280 + 4;
    let cardHeight = 280 + 4;

    for (let row = 0; row < config.rows; row++) {
        for (let col = 0; col < config.cols; col++) {
            cardsPosition.push({
                x: col * cardWidth,
                y: row * cardHeight,
            });
        }
    }

    return cardsPosition;
};

let config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1200,
    height: 720,
    rows: 2,
    cols: 4,
    scene: scene,
}
let game = new Phaser.Game(config);