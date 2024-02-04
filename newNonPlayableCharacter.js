function newNonPlayableCharacter(x, y) {
    const element = newImage('assets/red-character/static.gif');
    element.style.zIndex = 1;

    let direction = null;

    function moveCharacter() {
        if (direction === 'west') x -= 1;
        if (direction === 'north') y += 1;
        if (direction === 'east') x += 1;
        if (direction === 'south') y -= 1;

        element.style.left = x + 'px';
        element.style.bottom = y + 'px';
    }

    setInterval(moveCharacter, 1);

    async function walk(direction, time, gifPath) {
        element.src = `./assets/red-character/${gifPath}.gif`;
        await sleep(time);
        stop();
    }

    const walkEast = async (time) => walk('east', time, 'east');
    const walkNorth = async (time) => walk('north', time, 'north');
    const walkWest = async (time) => walk('west', time, 'west');
    const walkSouth = async (time) => walk('south', time, 'south');

    function stop() {
        direction = null;
        element.src = `./assets/red-character/static.gif`;
    }

    async function moveNPC() {
        await walkNorth(1400);
        await walkEast(1200);
        await walkSouth(300);
        await walkEast(1500);
        await walkSouth(1500);
        await walkWest(2700);
        await walkNorth(400);
    }

    moveNPC();

    return {
        element,
        walkWest,
        walkNorth,
        walkEast,
        walkSouth,
        stop
    };
}

function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
