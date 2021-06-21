import { capitalizeFirstLetter } from "./string-helpers";

//create word from b26 number
const wordify = (number, word_number = 0) => {
	let rem = (number % 26);
	let n = Math.floor( (number - rem) / 26);

	let acc = String.fromCharCode(97 + rem);

	while(n > 0) {
		rem = n % 26;
		n = Math.floor( (n - rem) / 26);
		let chr = String.fromCharCode(97 + rem);
		acc = chr + acc;
	}
	//ugh
	acc = acc.substring(1);
	if(word_number === 0) {
		return capitalizeFirstLetter(acc);
	} else {
		return " " + acc;
	}
}
export { wordify };