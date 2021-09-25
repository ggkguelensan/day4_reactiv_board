const board = document.querySelector('#board');
const tiles_number = 300;
const row_number = 20;
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

random_back_line_activation();
random_triple_line_activation();
setInterval(random_activation, 4000);
setInterval(random_line_activation, 4000);
setInterval(random_back_line_activation, 2500);
setInterval(random_triple_line_activation, 2500);

function change_element(element) {
    let color = get_random_color();
    let shape = get_random_shape();
    element.classList = 'tile';
    element.classList.add(shape);
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
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
    let temp_index = Math.floor(Math.random() * (tiles.length - 80));

    for (let k = 0; k < 3; k++) {
        (() => {
            for (let i = 0; i < 5; i++) {
                let index = temp_index;
                setTimeout(() => change_element(tiles[index + i]), 300 * i);
                setTimeout(() => get_back_element(tiles[index + i]), 1200 + 300 * i);
            };
            temp_index += 22;
        })();
    }
}

function boom_element(tile) {
    const index = tiles.indexOf(tile);

    for (let i = 20; 0 <= index - i; i += 20) {
        setTimeout(() => change_element(tiles[index - i]), 0);
        setTimeout(() => get_back_element(tiles[index - i]), 1200);
    };

    for (let i = 20; tiles_number > index + i; i += 20) {
        setTimeout(() => change_element(tiles[index + i]), 0);
        setTimeout(() => get_back_element(tiles[index + i]), 1200);
    };

    for (let i = 1; i + index % 20 < 20; i++) {
        setTimeout(() => change_element(tiles[index + i]), 0);
        setTimeout(() => get_back_element(tiles[index + i]), 1200);
    };

    for (let i = 1; index % 20 - i + 1 > 0; i++) {
        setTimeout(() => change_element(tiles[index - i]), 0);
        setTimeout(() => get_back_element(tiles[index - i]), 1200);
    };
}