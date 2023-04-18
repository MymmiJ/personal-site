export const getTimescales = (skillProgressions, xAxisDisplayTime) => {
    const timescales = skillProgressions
    .map(dataset => dataset.data.map(({ x }, i) => xAxisDisplayTime ? x : i+1));
    const flattenedTimescales = timescales.flat().sort().filter((item, pos, array) => !pos || item !== array[pos - 1]);
    return flattenedTimescales;
}