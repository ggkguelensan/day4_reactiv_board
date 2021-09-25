const tiles_number = 300;
const columns_number = 20;
const rows_number = 15;

let difficulty = 2000;

const board = document.querySelector('#board');
const log = console.log;
const colors = ['#3dd', '#d5d', '#dee', '#fdd', '#dd0'];
const shapes = ['square', 'circle', 'circle', 'circle', 'rombusr', 'rombusl'];
let tiles = [];

for (let i = 0; i < tiles_number; i++) {
    const tile = document.createElement('div');
    tiles.push(tile);
    tile.classList = 'tile';
    tile.classList.add('square');

    tile.addEventListener('mouseover', () => change_element(tile));
    tile.addEventListener('mouseleave', () => get_back_element(tile));
    tile.addEventListener('click', () => boom_element(tile));

    board.append(tile);
}

vanish_space();
setTimeout(game, 2000);
setInterval(random_activation, 1400);
setInterval(random_line_activation, 3000);
setInterval(random_back_line_activation, 2500);
setInterval(random_triple_line_activation, 2500);
setInterval(random_back_line_activation, 3500);
setInterval(random_triple_line_activation, 3500);

function change_element(element) {
    let color = get_random_color();
    let shape = get_random_shape();
    element.classList = 'tile';
    element.classList.add(shape);
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function change_element_red(element) {
    element.style.backgroundColor = 'red';
}

function get_back_element(element) {
    element.classList = 'tile';
    element.classList.add('square');
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = '0 0 2px #000';
}

function get_random_color() {
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function get_random_shape() {
    let index = Math.floor(Math.random() * shapes.length);
    return shapes[index];
}

function get_random_tile() {
    let index = Math.floor(Math.random() * tiles.length);
    return tiles[index];
}

function random_activation() {
    let tile = get_random_tile();
    change_element(tile);
    setTimeout(() => get_back_element(tile), 1200);
}

function random_line_activation() {
    let index = Math.floor(Math.random() * (tiles.length - 6));

    for (let i = 0; i < 5; i++) {
        setTimeout(() => change_element(tiles[index + i]), 300 * i);
        setTimeout(() => get_back_element(tiles[index + i]), 1200 + 300 * i);
    }

}

function random_back_line_activation() {
    let index = Math.floor(Math.random() * (tiles.length - 6)) + 6;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => change_element(tiles[index - i]), 300 * i);
        setTimeout(() => get_back_element(tiles[index - i]), 2000 + 300 * (5 - i));
    }
}

function random_triple_line_activation() {
    let temp_index = Math.floor(Math.random() * (tiles.length - (columns_number * 3 + 10)));

    for (let k = 0; k < 3; k++) {
        (() => {
            for (let i = 0; i < 5; i++) {
                let index = temp_index;
                setTimeout(() => change_element(tiles[index + i]), 300 * i);
                setTimeout(() => get_back_element(tiles[index + i]), 1200 + 300 * i);
            };
            temp_index += columns_number + 2;
        })();
    }
}

function boom_element(tile) {
    const index = tiles.indexOf(tile);

    for (let i = columns_number; 0 <= index - i; i += columns_number) {
        setTimeout(() => change_element(tiles[index - i]), 0);
        setTimeout(() => get_back_element(tiles[index - i]), 1200);
    };

    for (let i = columns_number; tiles_number > index + i; i += columns_number) {
        setTimeout(() => change_element(tiles[index + i]), 0);
        setTimeout(() => get_back_element(tiles[index + i]), 1200);
    };

    for (let i = 1; i + index % columns_number < columns_number; i++) {
        setTimeout(() => change_element(tiles[index + i]), 0);
        setTimeout(() => get_back_element(tiles[index + i]), 1200);
    };

    for (let i = 1; index % columns_number - i + 1 > 0; i++) {
        setTimeout(() => change_element(tiles[index - i]), 0);
        setTimeout(() => get_back_element(tiles[index - i]), 1200);
    };
}

function vanish_space() {
    for (let k = 0; k < tiles_number; k += columns_number) {
        (() => {
            let index = k;
            for (let i = 0; i < columns_number; i++) {
                setTimeout(() => change_element(tiles[index + i]), 60 * i);
                setTimeout(() => get_back_element(tiles[index + i]), 700 + 60 * i);
            };
        })();
    }
}

let score = {
    counter: 0,
    score_element: document.querySelector('#score'),
    add_point: function () {
        this.counter++;
        return this.counter;
    },
    render() {
        this.score_element.innerHTML = `Ты успел кликнуть на ${this.counter} <p>красных</p> тайлов из 7`;
    },
}

function create_aim(index) {
    let aim = tiles[index];
    let aim_visible_interval = setInterval(()=>{aim.style.transition = ''; change_element_red(aim);}, 20);
    let clear_visible_interval = setTimeout(() => clearInterval(aim_visible_interval), difficulty);
    aim.addEventListener('click', shoot);
    let aim_shoot_fail = setTimeout(()=>{
        aim.removeEventListener('click', shoot);
        get_back_element(aim)
    }, difficulty);
    function shoot() {
        clearInterval(aim_visible_interval);
        clearTimeout(clear_visible_interval);
        clearTimeout(aim_shoot_fail);
        aim.removeEventListener('click', shoot);
        score.add_point();
        score.render();
        difficulty -= 150;
        get_back_element(aim)
    }

    

}

function game() {
    setInterval(()=>create_aim(Math.floor(Math.random() * tiles.length)), 4000);
}