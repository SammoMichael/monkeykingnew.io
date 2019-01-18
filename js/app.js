// Check if touchscreen
if ("ontouchstart" in document.documentElement) {
    console.log("your device is a touch screen device.");
    window.touch = true;
}
else {
    window.touch = false;
    console.log("your device is NOT a touch device");
}
// start screen & theme music
document.getElementById('game-start').style.display = 'block';
let gif = (1);
setInterval(() => {
    gif += 1;
    document.getElementById('img').src = `./img/monkey-king-big${(gif + 1)%4+1}.png`; 
}, 2000);

document.getElementById('start').addEventListener('click', () => {
    var music = document.getElementById('ambush');
    music.play();
    var audio = new Audio('audio/ambush2.mp3');
    audio.play();
window.music = document.getElementById('ambush');
document.getElementById('game-start').style.display = 'none';
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame  ||
    window.mozRequestAnimationFrame     ||
    window.oRequestAnimationFrame       ||
    window.msRequestAnimationFrame      ||
    function(callback){
    window.setTimeout(callback, 1000 / 60);
    };
})();
// On Screen Controls
if (window.touch) {
    var fire = document.getElementById('circle');
    var left = document.getElementById('circle2');
    var right = document.getElementById('circle3');
    var up = document.getElementById('circle4');
    var down = document.getElementById('circle5');
    var bar = document.getElementById('bar').style.width;
}
var barValue = document.getElementById('bar').style.width.slice(0, -1);
var canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
    var canvas = document.getElementById("canvas");
    canvas.width = canvas.style.width;
    canvas.height = canvas.style.height;

var ctx = canvas.getContext("2d");
// var canstyle = document.getElementById('canvas').style;
// canstyle.width ? canvas.width = canstyle.width : null;
// canstyle.width ? canvas.height = canstyle.width : null;
// canvas.width = 1500;
// canvas.height = 900;

console.log(canvas.style);
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var frame = document.getElementById('frame');
frame.appendChild(canvas);
const video = () => {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var video = document.getElementById('video');
    video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                ctx.drawImage($this, 0, 0);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);
}
var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    lastTime = now;
    requestAnimFrame(main);
};
function init() {
    document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });
    reset();
    lastTime = Date.now();
    main();
}
resources.load([
    'img/fighter.png',
    'img/explode.png',
    'img/bluebird2.png',
    'img/bluebird.png',
    'img/fire1.png',
    'img/peach.png',
    'img/monkey_king_cry.png',
    'img/monkeykingangry.png',
    'img/monkey_king_sleep.png',
    'img/monkey_king_staff.png',
    'img/sprites.png',
    'img/peach.png',
    'img/monkey_king_stands.png',
]);
resources.onReady(init);

var player = {
    pos: [0, 0],
    sprite: new Sprite('img/monkey_king_stands.png', [2, 0], [55, 65], 100, [0, 1, 2, 3])
};
var player2 = {
    pos: [0, 0],
    sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 100, [35])
};
    var fire = {
    pos: [player.pos[0], player.pos[1]],
        sprite: new Sprite('img/explode.png',
            [0, 0],
            [100, 100],
            16,
            [0, 1, 2],
            null,
            true)
    };
    var score = 0;
window.player = player;
window.player2 = player;
var database = firebase.database();
    // firebase.auth().signInAnonymously().catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    // });
    var playersRef = firebase.database().ref("users/");
    // playersRef.set({
    //     name: "sam",
    //     score
    // });
    // function writeUserData(score) {
    //     firebase.database().ref('users/' + score).set({
    //         score
    //     });
    // }


var monkey = true;
var bosses = [];
var bullets = [];
var enemies = [{}];
var explosions = [];
var peaches = [];
var lastFire = Date.now();
var gameTime = 0;
var isGameOver;
var fireballs = [];
var scoreEl = document.getElementById('score');
var healthEL = document.getElementById('health');
var health = 100;
healthEL.innerHTML = health;
var playerSpeed = 600;
var player2Speed = 1000;
var bulletSpeed = 1000;
var fireballSpeed = 1000;
var bossesSpeed = 200;
var enemySpeed = 150;
var peachesSpeed = 100;
window.bar.style.width = (window.health.innerHTML + "%") ;
function update(dt) {
    // end spin transformation
if (window.transformTime - Date.now() <= -2000) {
    monkey = true
}
// var lastEnemy = Date.now();
gameTime += dt;
handleInput(dt);
updateEntities(dt);
    if (Math.random() < 1 - Math.pow(.998, gameTime) && enemies.length < 30) {
        enemies.push({
            pos: [canvas.width,
            Math.random() * (canvas.height - 39)],
            sprite: new Sprite('img/monkeykingangry.png', [0, 0], [60, 60], 
            50, [0, 1, 2, 3])
        });
    }
    if (bosses.length < 1 && score >= 0) {
        // var lastEnemy = Date.now();
        bosses.push({
            pos: [canvas.width,
            Math.random() * (canvas.height - 39)],
            sprite: new Sprite('img/bluebird.png', [0, 0], [180, 180], 
            40, [0, 1])
        });
    }
    if (bosses.length < 2 && score >= 10000) {
        // var lastEnemy = Date.now();
        bosses.push({
            pos: [canvas.width,
            Math.random() * (canvas.height - 39)],
            sprite: new Sprite('img/bluebird.png', [0, 0], [180, 180], 
            40, [0, 1])
        });
    }
    if ((enemies.length > 10 || bosses.length) && peaches.length <= 2) {
        peaches.push({
            pos: [canvas.height,
            Math.random() * (canvas.width - 25)],
            sprite: new Sprite('img/peach.png', [0, 0], [300, 300],
            6, [0])
        });
    }
    checkCollisions();
    if (!isGameOver) {
        scoreEl.innerHTML = score;
    }
}
function handleInput(dt) {
    if(input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
        player2.pos[1] += playerSpeed * dt;
    }
    if(input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
        player2.pos[1] -= playerSpeed * dt;
    }
    if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
        player2.pos[0] -= playerSpeed * dt;
    }
    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
        player2.pos[0] += playerSpeed * dt;
    }
    if(input.isDown('SPACE') &&
       !isGameOver &&
       Date.now() - lastFire > 800 && monkey === true) {
        //    document.getElementById("attack").play();
           var x = player.pos[0]; 
           var y = player.pos[1] -40;
        // if (Date.now() - lastFire > 1500) {
               bullets.push({
                   pos: [x, y],
                   dir: 'forward',
                //    sprite: new Sprite('img/explode.png',
                //        [0, 0],
                //        [100, 100],
                //        16,
                //        [0, 1, 2],
                //        null,
                //        true)
                //    sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35])
            });
               bullets.push({
                   pos: [x, y],
                   dir: 'back',
                //    sprite: new Sprite('img/explode.png',
                //        [0, 0],
                //        [100, 100],
                //        16,
                //        [0, 1, 2],
                //        null,
                //        true)
                //    sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35])
            });
        //    }
        bullets.push({ pos: [x, y],
                       dir: 'forward',
            sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35]) });
        // fireballs.push({ pos: [x, y],
        //                dir: 'forward',
        //     sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0]) });
        // bullets.push({ pos: [x, y],
        //                dir: 'up',
        //                sprite: new Sprite('img/sprites.png', [0, 50], [9, 5]) });
        // bullets.push({ pos: [x, y],
        //                dir: 'down',
        //                sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });
        lastFire = Date.now();
    
        // bullets.push({ pos: [x, y],
        //                dir: 'back',
        //     sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35]) });
        // // fireballs.push({ pos: [x, y],
        // //                dir: 'forward',
        // //     sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0]) });
        // // bullets.push({ pos: [x, y],
        // //                dir: 'up',
        // //                sprite: new Sprite('img/sprites.png', [0, 50], [9, 5]) });
        // // bullets.push({ pos: [x, y],
        // //                dir: 'down',
        // //                sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });
        // lastFire = Date.now();
    }
}
function updateEntities(dt) {
    player.sprite.update(dt);
    player2.sprite.update(dt);
    for (var i=0; i<bullets.length; i++) {
        var bullet = bullets[i];
        switch(bullet.dir) {
            case 'up': bullet.pos[1] -= bulletSpeed * dt; break;
            case 'down': bullet.pos[1] += bulletSpeed * dt; break;
            case 'back': bullet.pos[0] -= bulletSpeed * dt; break;
            default: bullet.pos[0] += bulletSpeed * dt;
        }
        if(bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
            bullet.pos[0] > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }
    for(var i=0; i<fireballs.length; i++) {
        var fireball = fireballs[i];
        switch(fireball.dir) {
            case 'up': fireball.pos[1] -= fireballSpeed * dt; break;
            case 'down': fireball.pos[1] += fireballSpeed * dt; break;
            case 'back': fireball.pos[0] -= fireballSpeed * dt; break;
            case 'down': fireball.pos[0] += fireballSpeed * dt; break;
            default: fireball.pos[0] += fireballSpeed * dt;
        }
        if(fireball.pos[1] < 0 || fireball.pos[1] > canvas.height ||
            fireball.pos[0] > canvas.width) {
            fireballs.splice(i, 1);
            i--;
        }
    }
    for(var i=0; i<enemies.length; i++) {
        if (Math.floor(gameTime) % 2 === 0 && i % 2 === 0) {
            if (player.pos[0] < enemies[i].pos[0]) {
                enemies[i].pos[0] -= enemySpeed * dt;
            } else {
                enemies[i].pos[0] += enemySpeed * dt;
        }
        if (player.pos[1] < enemies[i].pos[1]) {
            enemies[i].pos[1] -= enemySpeed * dt;
        } else {
            enemies[i].pos[1] += enemySpeed * dt;
        } } else {
            enemies[i].pos[0] -= enemySpeed * dt;
        } 
        enemies[i].sprite.update(dt);
        if(enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
            enemies.splice(i, 1);
            i--;
        }
    }

    for (var i=0; i<bosses.length; i++) {
        if (player) {
        if (player.pos[0] < bosses[i].pos[0]) {
            bosses[i].pos[0] -= bossesSpeed * dt;
            bosses[i].pos[1] -= bossesSpeed * dt;
        } else {
            bosses[i].pos[0] += bossesSpeed * dt;
        }
        if (player.pos[1] < bosses[i].pos[1]) {
            bosses[i].pos[1] -= bossesSpeed * dt;
        } else {
            bosses[i].pos[1] += bossesSpeed * dt;
        }
    } else {
        bosses[i].pos[0] -= bossesSpeed * dt;
    }
        const rate = 25;
        if ((Math.floor(Math.random() * rate) % rate) === 1) {
        if (player.pos[0] < bosses[i].pos[0]) {
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                       dir: 'back',
            sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4]) });
            bosses[i].pos[1] -= bossesSpeed * dt;
            bosses[i].pos[0] -= bossesSpeed * dt;
        } else {
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'forward',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        }
        if (player.pos[1] > bosses[i].pos[1]) {
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'down',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        } else {
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'up',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        } 
    } 
        bosses[i].sprite.update(dt);
    }
    for(var i=0; i<peaches.length; i++) {
        peaches[i].pos[0] -= peachesSpeed * dt;
        peaches[i].sprite.update(dt);
        if(peaches[i].pos[0] + peaches[i].sprite.size[0] < 0) {
            peaches.splice(i, 1);
            window.bar.style.width = ((window.health.innerHTML *.14) + "%");
            i--;
        }
    }
    for(var i=0; i<explosions.length; i++) {
        explosions[i].sprite.update(dt);
        if(explosions[i].sprite.done) {
            explosions.splice(i, 1);
            i--;
        }
    }
}
function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
    checkPlayerBounds();
    // if(bosses.length) {
        checkBossBounds();
    // }
    for (var i = 0; i < enemies.length; i++) {
        if (boxCollides(enemies[i].pos, enemies[i].sprite.size, player.pos, player.sprite.size)) {
            
        }
    }

    for (var k = 0; k < bosses.length; k++) {
        var pos = bosses[k].pos;
        var size = bosses[k].sprite.size;
        if (boxCollides(bosses[k].pos, bosses[k].sprite.size, player.pos, player.sprite.size)) {
            bosses[k].sprite.url = 'img/bluebird2.png'
            if (typeof (bosses[k].sprite.url) !== 'undefined') {
            setTimeout(function () { bosses[0].sprite.url ? bosses[0].sprite.url = 'img/bluebird.png' : null }, 500);
            // console.log('ouch');
            }
            if (window.health.innerHTML <= 0) {
                gameOver();
            } else {
                if (monkey) {
                    window.health.innerHTML -= 2;
                }
                else if
                (window.health.innerHTML <= 0) {
                    gameOver();
                }
            }
        }
    for(var i=0; i<peaches.length; i++) {
        var pos = peaches[i].pos;
        var size = peaches[i].sprite.size;
        var pos2 = player.pos;
        var size2 = player.sprite.size;
        if(boxCollides(pos, size, pos2, size2)) {
            peaches.splice(i, 1);
            window.health.innerHTML -= -10;
            window.bar.style.width = ((window.health.innerHTML * .14) + "%");
            monkey = false;
           document.getElementById("attack").play();

            transformTime = Date.now();
        }
    }
    for(var i=0; i<fireballs.length; i++) {
        var pos = fireballs[i].pos;
        var size = fireballs[i].sprite.size;
        var pos2 = player.pos;
        var size2 = player.sprite.size;
        if(boxCollides(pos, size, pos2, size2)) {
             (window.health.innerHTML -= fireballs.length / 10000)
            window.bar.style.width = ((window.health.innerHTML * .14) + "%");
            explosions.push({
                pos: pos2,
                sprite: new Sprite('img/explode.png',
                [0, 0], [100, 100], 16, [0, 1, 2], null, true)
            })
                if (window.health.innerHTML <= 0) {
                    gameOver();
                }
            }
            window.bar.style.width = ((window.health.innerHTML * .14) + "%");
         }

        for (var j = 0; j < bullets.length; j++) {
            var pos2 = bullets[j].pos;
            var size2 = bullets[j].sprite.size;
            if (boxCollides(bosses[k].pos, bosses[k].sprite.size, bullets[j].pos, bullets[j].sprite.size)) {
                bosses[k].sprite.url = 'img/bluebird2.png'
                setTimeout(function () { bosses[0].sprite.url = 'img/bluebird.png' }, 500);
                score += 100;
                // console.log('oww')
                bosses[k].sprite.health -= 10;
                bullets.splice(j, 1);
                if (bosses[k].sprite.health <= 0) {
                    explosions.push({
                        pos: bosses[k].pos,
                        sprite: new Sprite('img/explode.png',
                            [0, 0],
                            [100, 100],
                            16,
                            [0, 1, 2],
                            null,
                            true)
                    })
                    bosses.splice(k, 1)
                    break;
                }
            }
        }
        for(var i=0; i<enemies.length; i++) {
            var pos = enemies[i].pos;
            var size = enemies[i].sprite.size;
            if (boxCollides(pos, size, player.pos, player.sprite.size)) {
                if (window.health.innerHTML <= 0) {
                    gameOver();
                } else {
                    if (monkey) {
                        window.health.innerHTML -= 10;
                        window.bar.style.width = ((window.health.innerHTML * .14) + "%");

                    }
                    if (window.health.innerHTML <= 0) {
                        gameOver();
                        window.bar.style.width = ((window.health.innerHTML * .14) + "%");

                    }
                }
                enemies.splice(i, 1);
                i--;
                score += 100;

                explosions.push({
                    pos: pos,
                    sprite: new Sprite('img/monkey_king_cry.png',
                        [3, 11],
                        [65, 115],
                        16,
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                        null,
                        true)
                });
                break;
            }
                if(boxCollides(pos, size, pos2, size2)) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                score += 100;
                i--;
                if (!gameOver) {
                }
                explosions.push({
                    // pos: pos,
                    // sprite: new Sprite('img/explode.png',
                    //                    [0, 0],
                    //                    [100, 100],
                    //                    16,
                    //                    [0, 1, 2],
                    //                    null,
                    //                    true)
                    pos: pos,
                    sprite: new Sprite('img/monkey_king_cry.png',
                                       [3, 11],
                                       [65, 115],
                                       16,
                                       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                       null,
                                       true)
                });

                bullets.splice(j, 1);
                break;
            }
        }

            // if(bosses.length) {
                // for (var k = 0; k < bosses.length; k++) {
                //     var pos = bosses[k].pos;
                //     var size = bosses[k].sprite.size;
                //     if (boxCollides(bosses[k].pos, bosses[k].sprite.size, player.pos, player.sprite.size)) {
                //         console.log('ouch');
                //         if (window.health.innerHTML <= 0) {
                //             gameOver();
                //         } else {
                //             if (monkey) {
                //                 window.health.innerHTML -= 10;
                //             }
                //             else if 
                //                 (window.health.innerHTML <= 0) {
                //                 gameOver();
                //             }
                //         }
                //     }
                
                // if(boxCollides(bosses[k].pos, bosses[k].sprite.size, player2.pos, player2.sprite.size)) {
                //     score += 100;
                //     bosses[k].sprite.health -= 1;
                //     if(bosses[k].sprite.health <= 0) {
                //         bosses.splice(k, 1)
                //     } 
                // }
                
            // }
        }
        
        
}
function checkPlayerBounds() {
    if(player.pos[0] < 0) {
        player.pos[0] = 0;
    }
    else if(player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }
    if(player.pos[1] < 0) {
        player.pos[1] = 0;
    }
    else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
        player.pos[1] = canvas.height - player.sprite.size[1];
    }
}
function checkBossBounds() {
    for (var i = 0; i < bosses.length; i++) {
        var boss = bosses[i];
    }
    if(boss.pos[0] < 0) {
        boss.pos[0] = 0;
    }
    else if(boss.pos[0] > canvas.width - boss.sprite.size[0]) {
        boss.pos[0] = canvas.width - boss.sprite.size[0];
    }

    if(boss.pos[1] < 0) {
        boss.pos[1] = 0;
    }
    else if(boss.pos[1] > canvas.height - boss.sprite.size[1]) {
        boss.pos[1] = canvas.height - boss.sprite.size[1];
    }
}
window.angle = -90
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.angle -= 10; 
    if(!isGameOver) {
        if (monkey) {
            renderEntity(player);
        } else {
            player2.pos = player.pos;
            window.angle -= 10;
            ctx.save();
            ctx.translate(player2.pos[0], player.pos[1]);
            ctx.rotate(window.angle + Math.PI / 2.0);
            ctx.translate(-1 * [player2.pos[0]], -1 * player2.pos[1]);
            renderEntity(player2);
            renderEntity(player);
            fire.pos = player2.pos;
            renderEntity(fire);
            ctx.restore();
        }
    }
    renderEntities(fireballs);
    renderEntities(peaches);
    renderEntities(bullets);
    renderEntities(enemies);
    renderEntities(explosions);
        renderEntities(bosses);
};
function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }    
}
function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}
function gameOver() {
    if (isGameOver != true) {
        var leaderboardPromise = firebase.database().ref('users/').once('value').then(function (snapshot) {
            mappedScores = (Object.values(snapshot.val())).map((row, idx) => { return [row.name, row.score] } )
        })
        if (typeof mappedScores !== "undefined") {
        mappedScores.sort((function (a, b) { return b[1] - a[1] }));
            if (score > mappedScores.sort((function (a, b) { return b[1] - a[1] }))[4][1]) {
            var dialog = document.querySelector('dialog');
            dialog.showModal();
            document.querySelector('dialog').addEventListener('keydown', (e) => {
                if (e.keyCode === 13) {
                    var value = document.querySelector('#return_value').value;
                    var name = value;
                    if (name === null || name === "") {
                        name = "Sun Wukong"
                        dialog.close(value);
                    }
                    firebase.database().ref('users/').push({
                        name: name + " " + Math.random(),
                        score: score

                    })
                    var leaderboardPromise = firebase.database().ref('users/').once('value').then(function (snapshot) {
                        mappedScores = (Object.values(snapshot.val())).map((row, idx) => { return [row.name, row.score] })
                    })
                    if (typeof mappedScores !== "undefined") {
                        mappedScores.sort((function (a, b) { return b[1] - a[1] }));
                        document.getElementById('1').innerHTML = "1. " + mappedScores[0][0].split(' ')[0] + "  " + mappedScores[0][1]
                        document.getElementById('2').innerHTML = "2. " + mappedScores[1][0].split(' ')[0] + "  " + mappedScores[1][1]
                        document.getElementById('3').innerHTML = "3. " + mappedScores[2][0].split(' ')[0] + "  " + mappedScores[2][1]
                        document.getElementById('4').innerHTML = "4. " + mappedScores[3][0].split(' ')[0] + "  " + mappedScores[3][1]
                        document.getElementById('5').innerHTML = "5. " + mappedScores[4][0].split(' ')[0] + "  " + mappedScores[4][1]
                    }
                }
            })
            document.querySelector('#close').onclick = function () {
                var value = document.querySelector('#return_value').value;
                dialog.close(value);
                var name = value;
                if (name === null || name === "") {
                    name = "Sun WuKong"
                }
                firebase.database().ref('users/').push({
                    name: name + " " + Math.random(),
                    score: score
                    
                })
                var leaderboardPromise = firebase.database().ref('users/').once('value').then(function (snapshot) {
                    mappedScores = (Object.values(snapshot.val())).map((row, idx) => { return [row.name, row.score] })
                })
                if (typeof mappedScores !== "undefined") {
                    mappedScores.sort((function (a, b) { return b[1] - a[1] }));
                    document.getElementById('1').innerHTML = "1. " + mappedScores[0][0].split(' ')[0] + "  " + mappedScores[0][1]
                    document.getElementById('2').innerHTML = "2. " + mappedScores[1][0].split(' ')[0] + "  " + mappedScores[1][1]
                    document.getElementById('3').innerHTML = "3. " + mappedScores[2][0].split(' ')[0] + "  " + mappedScores[2][1]
                    document.getElementById('4').innerHTML = "4. " + mappedScores[3][0].split(' ')[0] + "  " + mappedScores[3][1]
                    document.getElementById('5').innerHTML = "5. " + mappedScores[4][0].split(' ')[0] + "  " + mappedScores[4][1]
                }
        }
    }
                var leaderboardPromise = firebase.database().ref('users/').once('value').then(function (snapshot) {
                    mappedScores = (Object.values(snapshot.val())).map((row, idx) => { return [row.name, row.score] })
                })

        };
    
    }
    isGameOver = true;
    window.bar.style.width = ((0) + "%");
    if(typeof mappedScores !== "undefined") {
        mappedScores.sort((function (a, b) { return b[1] - a[1] }));
        document.getElementById('1').innerHTML = "1. " + mappedScores[0][0].split(' ')[0] + "  " + mappedScores[0][1]
        document.getElementById('2').innerHTML = "2. " + mappedScores[1][0].split(' ')[0] + "  " + mappedScores[1][1]
        document.getElementById('3').innerHTML = "3. " + mappedScores[2][0].split(' ')[0] + "  " + mappedScores[2][1]
        document.getElementById('4').innerHTML = "4. " + mappedScores[3][0].split(' ')[0] + "  " + mappedScores[3][1]
        document.getElementById('5').innerHTML = "5. " + mappedScores[4][0].split(' ')[0] + "  " + mappedScores[4][1]
    }
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('leaderboard').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
}
function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    gameTime = 0;
    score = 0;
    window.health.innerHTML = 500;
    window.bar.style.width = (500 + "%");
    enemies = [];
    bosses = [];
    bullets = [];
    monkey = true;
    player2.pos = [50, canvas.height / 2];
    player.pos = [50, canvas.height / 2];
    };
})

