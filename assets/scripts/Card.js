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

    flip() {
        this.hideCard();
    }

    hideCard(texture) {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Liner',
            duration: 150,
            onComplete: () => {
                this.showCard(texture);
            }
        });
    }

    showCard(texture) {
        this.setTexture(texture);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            ease: 'Liner',
            duration: 300,
        })
    }

    openCard() {
        this.opened = true;
        this.hideCard('card' + this.value);
        // this.setTexture('card' + this.value);
    }

    closeCard() {
        this.opened = false;
        this.hideCard('card');
    }
}