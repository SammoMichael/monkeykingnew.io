window.onload = (() => {
    var pressedKeys = {};
    function setKey(event, status) {
        var code = event.keyCode;
        var key
        switch (code) {
        case 32:
            key = 'SPACE'; break;
        case 37:
            key = 'LEFT'; break;
        case 38:
            key = 'UP'; break;
        case 39:
            key = 'RIGHT'; break;
        case 40:
            key = 'DOWN'; break;
        default:
            // Convert ASCII codes to letters
            key = String.fromCharCode(code);
        }
        // console.log(event);
        // console.log(status);
        // if window.touch = true
        var key;
        if (event.type === "pointerdown") {
            if (event.path[0].id === "circle") {
                e.preventDefault;
                key = 'SPACE';
                // status = true;
                // console.log('SPACE');
                // console.log(event.path);
                // console.log(event.path.id);
                // console.log(key);
            }
            if (event.path[0].id === "circle2") {
                key = 'UP';
                // status = true;
                // console.log('UP');
                // console.log(key);
                // console.log(event.path);
            }
            if (event.path[0].id === "circle3") {
                // status = true;
                // key = 'RIGHT';
                // console.log('RIGHT');
                // console.log(key);
                // console.log('event');
            }
            if (event.path[0].id === "circle4") {
                // status = true;
                // key = 'LEFT';
                // console.log('LEFT');
                // console.log('event');
            }
            if (event.path[0].id === 'circle5') {
                // status = true;
                // key = 'DOWN';
                // console.log('DOWN');
                // console.log('event');
            }
        }
        pressedKeys[key] = status;
        // console.log(pressedKeys[key]);
        // console.log(key);
    }
    document.addEventListener("mousemove", (event) => {
        event.preventDefault;
        var player = window.player;
            if (event.offsetX > 1500 && player) {
                player.pos[0] = 1500;
            } else if (player) {
                player.pos[0] = event.offsetX;
            }

        if (event.offsetY > 900 && player) {
                player.pos[1] = 900;
        } else if (player) {
                player.pos[1] = event.offsetY;
            }

        });
    document.addEventListener("pointermove", (event) => {
            event.preventDefault;
            var player = window.player;
        if (event.offsetX > 1450 && player) {

                player.pos[0] = 1450;
        } else if (player){
                player.pos[0] = event.offsetX;
            }

        if (event.offsetY > 850 && player) {
                player.pos[1] = 850;
        } else if (player){
                player.pos[1] = event.offsetY;
            }

        });
    document.addEventListener("touchmove", (event) => {
            event.preventDefault;
        var player = window.player;

        if (event.offsetX > 1450 && player) {
            var player = window.player;

                player.pos[0] = 1450;
            } else if(player) {
                player.pos[0] = event.offsetX;
            }

        if (event.offsetY > 850 && player) {
                player.pos[1] = 850;
        } else if (player) {
                player.pos[1] = event.offsetY;
            }

        });


        document.addEventListener('mousedown', (e) => {
            // console.log('mouse');
            // setKey(e, true);
        });
        
        document.addEventListener('pointerdown', (e) => {
            // console.log('pointer');
            setKey(e, true);
        });
        document.addEventListener('keydown', (e) => {
            setKey(e, true);
        });
        document.addEventListener('pointerup', (e) => {
            pressedKeys = {};
        });
        document.addEventListener('touchstart', (e) => {
            setKey(e, true);
        });
        document.addEventListener('touchend', (e) => {
            pressedKeys = {};
        });
        // document.addEventListener('pointermove', (e) => {
            //     setKey(e, true);
            // });
            document.addEventListener('keyup', (e) => {
                setKey(e, false);
            });
            window.addEventListener('blur', () => {
                pressedKeys = {};
            });
            window.input = {
                isDown: (key) => {
                    pressedKeys['SPACE'] = true;
                    return pressedKeys[key.toUpperCase()];
            }
        };
})();
