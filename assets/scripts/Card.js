class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        // this.setOrigin(0, 0);
        this.scene.add.existing(this);
        this.setInteractive();
        // this.on('pointerdown', this.openCard, this);
        this.opened = false;

        // як розтягнути:
        // this.setScale(0.5, 0.5) // або:
        // this.scaleX = 0.5;
        // this.scaleY = 0.5;
        // this.hideCard();
    }

    init(position) {
        this.position = position;
        this.closeCard();
        this.setPosition(-this.width, -this.height)
    }


    movePosition(params) {
        this.scene.tweens.add({
            targets: this,
            x: params.x,
            y: params.y,
            delay: params.delay,
            ease: 'Liner',
            duration: 150,
            onComplete: () => {
                if (params.callback) {
                    params.callback()
                }
            }
        });
        // this.setPosition(params.x, params.y)
    }

    flip() {
        this.hideCard();
    }

    hideCard() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Liner',
            duration: 150,
            onComplete: () => {
                this.showCard();
            }
        });
    }

    showCard() {
        let texture = this.opened ? 'card' + this.value : 'card';
        this.setTexture(texture);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            ease: 'Liner',
            duration: 150,
        })
    }

    openCard() {
        this.opened = true;
        this.hideCard();
        // this.hideCard('card' + this.value);
        // this.setTexture('card' + this.value);
    }

    closeCard() {
        if (this.opened) {
            this.opened = false;
            this.hideCard();
        }
        // this.hideCard('card');
    }
}