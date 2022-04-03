class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        // 1. Dounload background.
        this.load.image('bg', 'assets/sprites/background.png');
        this.load.image('card', 'assets/sprites/card.png');

        this.load.image('card1', 'assets/sprites/card1.png');
        this.load.image('card2', 'assets/sprites/card2.png');
        this.load.image('card3', 'assets/sprites/card3.png');
        this.load.image('card4', 'assets/sprites/card4.png');

    }

    create() {
        // 2. Show background.
        // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
        this.createBackground();
        this.createCards();
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }

    createCards() {
        this.cards = [];
        let positions = this.getCardsPosition();
        // for (let position of positions) {
        //     this.cards.push(new Card(this, position));
        //     // this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);
        // }

        Phaser.Utils.Array.Shuffle(positions);

        for (let value of config.cards) {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value, positions.pop()));
            }
        }
    }

    getCardsPosition() {
        let cardsPosition = [];
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardWidth = cardTexture.width + 4;
        let cardHeight = cardTexture.height + 4;
        // let cardWidth = 280 + 4;
        // let cardHeight = 280 + 4;
        let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2;
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2;
        // let offsetX = 55;
        // let offsetY = 20;


        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                cardsPosition.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight,
                });
            }
        }
        return cardsPosition;
    }
}

    //     scene.preload = function () {
    //         this.load.image('bg', 'assets/sprites/background.png');
    //         this.load.image('card', 'assets/sprites/card.png');
    //    };

    // scene.create = function () {
    //     // 2. Show background.
    //     // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
    //     this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

    //     let positions = this.getCardsPosition();
    //     for (let position of positions) {
    //         this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);
    //     }
    // };

    // scene.getCardsPosition = function () {
    //     let cardsPosition = [];
    //     // let cardTexture = this.textures.get('card').getSourceImage();
    //     // let cardWidth = cardTexture.width + 4;
    //     // let cardHeight = cardTexture.height + 4;
    //     let cardWidth = 280 + 4;
    //     let cardHeight = 280 + 4;
    //     // let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2;
    //     // let offsetY = (this.sys.game.config.heigth - cardHeight * config.rows) / 2;
    //     let offsetX = 55;
    //     let offsetY = 20;


    //     for (let row = 0; row < config.rows; row++) {
    //         for (let col = 0; col < config.cols; col++) {
    //             cardsPosition.push({
    //                 x: offsetX + col * cardWidth,
    //                 y: offsetY + row * cardHeight,
    //             });
    //         }
    //     }

    //     return cardsPosition;
    // };