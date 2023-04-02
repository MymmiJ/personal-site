// Never want to change these values for generating rainbow colors
const SATURATION = 1;
const FULL_COLOR = 1;
const ZERO_COLOR = 0;

export const getColorFromSpectrumPosition = (spectrumPosition) => {
    const spectrumSegment = Math.floor(spectrumPosition * 6);
    const spectrumSegmentPosition = spectrumPosition * 6 - spectrumSegment;

    const waningColor = FULL_COLOR * (1 - spectrumSegmentPosition);
    const waxingColor = FULL_COLOR * (1 - (1 - spectrumSegmentPosition) * SATURATION);
    let r, g, b;
    switch (spectrumSegment % 6) {
        case 0:
            r = FULL_COLOR;
            g = waxingColor;
            b = ZERO_COLOR;
            break;
        case 1:
            r = waningColor;
            g = FULL_COLOR;
            b = ZERO_COLOR;
            break;
        case 2:
            r = ZERO_COLOR;
            g = FULL_COLOR;
            b = waxingColor;
            break;
        case 3:
            r = ZERO_COLOR;
            g = waningColor;
            b = FULL_COLOR;
            break;
        case 4:
            r = waxingColor;
            g = ZERO_COLOR;
            b = FULL_COLOR;
            break;
        case 5:
            r = FULL_COLOR;
            g = ZERO_COLOR;
            b = waningColor;
            break;
        default:
            console.warn('Maths has been disproven');
            r = g = b = FULL_COLOR;
            break;
    }

    return {
        red: Math.round(r * 255),
        green: Math.round(g * 255),
        blue: Math.round(b * 255),
    };
}