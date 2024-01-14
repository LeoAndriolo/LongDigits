// Inicializar os Assets
function preload() {
  this.load.spritesheet('monkey', 'assets/Idle.png', { frameWidth: 32, frameHeight: 32 });
  //this.load.image("player", "assets/repl.png");
}

// Criar Assets no Game
function create() {
  //  Frame debug view
  this.add.grid(0, 0, 512, 32, 32, 32).setOrigin(0, 0).setOutlineStyle(0x00ff00);

  this.add.image(0, 0, 'monkey', '__BASE').setOrigin(0, 0);

  this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  // Animation Set
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('monkey', { frames: [1, 2, 3, 4, 5, 6, 7, 8] }),
    frameRate: 4,
    repeat: -1
  });

  const monke = this.add.sprite(300, 150);
  monke.setScale(4);
  monke.play('idle');


  this.player = this.physics.add
    .image(config.width / 2, config.height / 2, "monkey")
    .setScale(2, 2);
  this.player.setCollideWorldBounds(true);

}

// Atualizar o Game
function update() {
  let cursors = this.input.keyboard.createCursorKeys();
  if (
    cursors.left.isDown ||
    this.a.isDown ||
    cursors.right.isDown ||
    this.d.isDown
  )
    this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -300 : 300);
  else this.player.setVelocityX(0);
  if (
    cursors.up.isDown ||
    this.w.isDown ||
    cursors.down.isDown ||
    this.s.isDown
  )
    this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -160 : 160);
  else this.player.setVelocityY(0);
}

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  backgroundColor: "#2e4f46",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
