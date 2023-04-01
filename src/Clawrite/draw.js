import { EASTWEST, NORTHSOUTH, size, length_to_width_ratio, symbol_size } from "./constants";

let cursor_location = 25; // Oh dear.

const drawSlash = (context, centerPointX, centerPointY, length, orientation) => {
    let lengthX;
    let lengthY;

    if(orientation) {
        lengthX = length;
        lengthY = length / 10;
    } else {
        lengthX = length/10
        lengthY = length;
    }

    context.beginPath();
    context.ellipse(centerPointX,centerPointY,lengthX,lengthY,0,0,2*Math.PI);
    context.fill();
};

const drawSymbol = (context, input, size, symbolSize, rowNumber, ltw) => {
    let slashAcrossNumber = 0;
    let slashDownNumber = 0; //initialise here to be used in loops
    //we can use 2 ints as our input to show which slashes to draw and which to leave out as though they were vectors of booleans (I guess they are)
    //this means we can extend our ClaWrite system to include writing with 4 or more slashes at a time, or to write a full sentence from just a number
    while(slashAcrossNumber < symbolSize) {
        if(input & 1) { //I chose input & 1 instead of input % 2 because I believe in this case it reflects the nature of the operation better - conveying bits into an &1, rather than performing a mathematical operation. I doubt there's a performance implication.
            drawSlash(context, cursor_location + size, 25 + (2 * slashAcrossNumber * (size / ltw)) + ((size * 2) * rowNumber), size, EASTWEST); //the second argument just makes the gap between slashes
        } else {
            //do nothing
        }
        input >>= 1; //again, this reflects the nature of the operation better than /= 2 in my opinion

        ++slashAcrossNumber;
    }

    while(slashDownNumber < symbolSize) {
        if(input & 1) {
            drawSlash(context, cursor_location + (size / 2) + (2 * slashDownNumber * (size / ltw)), 25 + (size / 2) + ((size * 2) * rowNumber), size, NORTHSOUTH);
        } else { //do nothing
        }
        input >>= 1;
        ++slashDownNumber;
    }
}

const writeString = (context, input_array) => {
    let row_number = 0;

    let i = 0;
    const len = input_array.length;
    const cwidth = context.canvas.width;
    while(i < len) {
        if(cursor_location > cwidth - (size * 2)) { 
            //very simple text wrapping
            cursor_location = 25;
            row_number++;
            drawSymbol(context, input_array[i], size, symbol_size, row_number, length_to_width_ratio);
            cursor_location += (size * 2);
        } else {
            drawSymbol(context, input_array[i], size, symbol_size, row_number, length_to_width_ratio);
            cursor_location += (size * 2);
        }
        ++i;
    }
}

export default writeString;