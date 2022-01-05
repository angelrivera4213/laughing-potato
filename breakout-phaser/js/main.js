(function () {
    function main () {
        const game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
            preload: preload, create: create, update: update
        });

        let ball;
        let paddle;
        let bricks;
        let scoreText;
        let score = 0;
        let lives = 3;
        let livesText;
        let lifeLostText;
        let textStyle = { font: '18px Arial', fill: '#0095DD' };

        function preload() {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.stage.backgroundColor = '#eee';

            // Load the ball sprite
            game.load.spritesheet('ball', 'img/wobble.png', 20, 20);

            // Load the paddle sprint
            game.load.image('paddle', 'img/paddle.png');

            // Load the brick sprite
            game.load.image('brick', 'img/brick.png');
        }

        function create() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.checkCollision.down = false;

            ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
            ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24)
            ball.anchor.set(0.5);
            game.physics.enable(ball, Phaser.Physics.ARCADE);
            ball.body.collideWorldBounds = true;
            ball.checkWorldBounds = true;
            ball.body.bounce.set(1);
            ball.body.velocity.set(150, -150);
            ball.events.onOutOfBounds.add(ballLeaveScreen, this);


            paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
            paddle.anchor.set(0.5, 1);
            game.physics.enable(paddle, Phaser.Physics.ARCADE);
            paddle.body.immovable = true;

            initBricks();

            scoreText = game.add.text(5, 5, 'Points: 0', textStyle);

            livesText = game.add.text(game.world.width - 5, 5, `Lives: ${lives}`, textStyle);
            livesText.anchor.set(1,0);

            lifeLostText = game.add.text(game.world.width * 0.5, game.world.height*0.5, 'Life lost, click to continue', textStyle);
            lifeLostText.anchor.set(0.5);
            lifeLostText.visible = false;
        }

        function update() {
            game.physics.arcade.collide(ball, paddle, onPaddleCollide);
            game.physics.arcade.collide(ball, bricks, onBrickCollide);
            paddle.x = game.input.x || game.world.width*0.5
        }

        function initBricks() {
            const brickInfo = {
                width: 50,
                height: 20,
                count: {
                    row: 3,
                    col: 7
                },
                offset: {
                    top: 50,
                    left: 60
                },
                padding: 10
            };

            bricks = game.add.group();

            for (let col = 0; col < brickInfo.count.col; col++) {
                for (let row = 0; row < brickInfo.count.row; row++) {
                    const brickX = (col * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
                    const brickY = (row * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
                    const newBrick = game.add.sprite(brickX, brickY, 'brick');

                    game.physics.enable(newBrick, Phaser.Physics.ARCADE);
                    newBrick.body.immovable = true;
                    newBrick.anchor.set(0.5);
                    bricks.add(newBrick);
                }
            }
        }

        function onBrickCollide (ball, brick) {
            ball.animations.play('wobble');

            const killTween = game.add.tween(brick.scale);
            killTween.to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
            killTween.onComplete.addOnce(() => {
                brick.kill();
                const win = bricks.children.every(b => !b.alive);

                if (win) {
                    alert('You won the game, congratulations!');
                    location.reload();
                }
            });
            killTween.start();

            score += 10;
            scoreText.setText(`Points: ${score}`);
        }

        function onPaddleCollide (ball, paddle) {
            ball.animations.play('wobble');
        }

        function ballLeaveScreen () {
            lives --;

            if (lives === 0) {
                alert('You lost, game over!');
                location.reload();
            } else {
                livesText.setText(`Lives: ${lives}`);
                lifeLostText.visible = true;
                ball.reset(game.world.width * 0.5, game.world.height - 25);
                paddle.reset(game.world.width * 0.5, game.world.height - 5);
                game.input.onDown.addOnce(function () {
                    lifeLostText.visible = false;
                    ball.body.velocity.set(150, -150);
                }, this);
            }
        }
    }

    window.addEventListener('load', (event) => {
        main();
    });

})();
