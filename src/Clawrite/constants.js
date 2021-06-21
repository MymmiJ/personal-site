const EASTWEST = true; 
const NORTHSOUTH = false;

const size = 50;
const length_to_width_ratio = 5;
const symbol_size = 3;

const letters = {
    h: 42, //101010, i.e. two vertical slashes and a horizontal slash
    e: 2, ////10 (010000)
    l: 12, //1100 (001100)
    o: 5,
    w: 60,
    r: 43,
    d: 45,
    th: 19
}

export { EASTWEST, NORTHSOUTH, size, length_to_width_ratio, symbol_size, letters };