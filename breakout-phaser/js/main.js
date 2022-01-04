(function () {
    function main () {
        const game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
            preload: preload, create: create, update: update
        });

        let ball;
        let paddle;

        function preload() {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.stage.backgroundColor = '#eee';

            // Load the ball sprite
            game.load.image('ball', 'img/ball.png');

            // Load the paddle sprint
            game.load.image('paddle', 'img/paddle.png');
        }

        function create() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.checkCollision.down = false;

            ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
            ball.anchor.set(0.5);
            game.physics.enable(ball, Phaser.Physics.ARCADE);
            ball.body.collideWorldBounds = true;
            ball.checkWorldBounds = true;
            ball.body.bounce.set(1);
            ball.body.velocity.set(150, -150);
            ball.events.onOutOfBounds.add(() => {
                alert('Game over!');
                location.reload();
            }, this);


            paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
            paddle.anchor.set(0.5, 1);
            game.physics.enable(paddle, Phaser.Physics.ARCADE);
            paddle.body.immovable = true;
        }

        function update() {
            game.physics.arcade.collide(ball, paddle);
            paddle.x = game.input.x || game.world.width*0.5
        }
    }

    window.addEventListener('load', (event) => {
        main();
    });

})();
