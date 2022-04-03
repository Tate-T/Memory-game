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

        this.load.audio('theme', 'assets/sounds/theme.mp3');
        this.load.audio('open', 'assets/sounds/open.mp3');
        this.load.audio('success', 'assets/sounds/success.mp3');
        this.load.audio('complete', 'assets/sounds/complete.mp3');
        this.load.audio('timer', 'assets/sounds/timer.mp3');
        this.load.audio('timeout', 'assets/sounds/timeout.mp3');

    }

    create() {
        // 2. Show background.
        // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
        this.createBackground();
        this.createCards();
        this.startGame();
        this.createTimer();
        this.createText();
        this.createSounds();
    }

    startGame() {
        this.timeout = config.timeout;
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.initCards();
    }

    initCards() {
        let positions = this.getCardsPosition();
        this.cards.forEach(card => {
            let position = positions.pop();
            card.closeCard();
            card.setPosition(position.x, position.y);
        })
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }

    createCards() {
        this.cards = [];
        // let positions = this.getCardsPosition();
        // for (let position of positions) {
        //     this.cards.push(new Card(this, position));
        //     // this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);
        // }

        // Phaser.Utils.Array.Shuffle(positions);

        // for (let value of config.cards) {
        //     for (let i = 0; i < 2; i++) {
        //         this.cards.push(new Card(this, value, positions.pop()));
        //     }
        // }

        for (let value of config.cards) {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value));
            }
        }

        this.input.on('gameobjectdown', this.onCardClicked, this)
    }

    onCardClicked(pointer, card) {
        if (card.opened) {
            return false;
        }

        this.sounds.open.play();

        if (this.openedCard) {
            if (this.openedCard.value === card.value) {

                this.sounds.success.play();
                this.openedCard = null;
                ++this.openedCardsCount;
            } else {
                this.openedCard.closeCard();
                this.openedCard = card;
            }
        } else {
            this.openedCard = card;
        }

        card.openCard();

        if (this.openedCardsCount === this.cards.length / 2) {
            this.sounds.complete.play();
            this.startGame();
        }
    }

    getCardsPosition() {
        let cardsPosition = [];
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardWidth = cardTexture.width + 4;
        let cardHeight = cardTexture.height + 4;
        // let cardWidth = 280 + 4;
        // let cardHeight = 280 + 4;
        let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2 + cardWidth / 2;
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2 + cardHeight / 2;
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
        return Phaser.Utils.Array.Shuffle(cardsPosition);
    }

    createTimer() {
        this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        })
    }

    createText() {
        this.timeoutText = this.add.text(10, 330, '', {
            font: '36px CurseCasual',
            fill: '#ffffff'
        });
    }

    onTimerTick() {
        this.timeoutText.setText('Time:' + this.timeout);

        if (this.timeout <= 0) {
            this.sounds.timeout.play();
            this.startGame();
            this.sounds.theme.play({ volume: 0.1 });
        } else {
            this.sounds.timer.play();
            --this.timeout;
        }
    }

    createSounds() {
        this.sounds = {
            open: this.sound.add('open'),
            complete: this.sound.add('complete'),
            success: this.sound.add('success'),
            timer: this.sound.add('timer'),
            timeout: this.sound.add('timeout'),
            theme: this.sound.add('theme'),
        };

        this.sounds.theme.play({ volume: 0.1 });
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