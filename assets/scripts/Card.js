class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value, position) {
        super(scene, position.x, position.y, 'card');
        this.scene = scene;
        this.value = value;
        this.setOrigin(0, 0);
        this.scene.add.existing(this);
        this.setInteractive();
        // this.on('pointerdown', this.openCard, this);
        this.opened = false;
    }

    openCard() {
        this.opened = true;
        this.setTexture('card' + this.value);
    }

    closeCard() {
        this.opened = false;
        this.setTexture('card');
    }
}