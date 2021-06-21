import { words  } from '../words-btree-array';
import { wordify } from '../wordify';
import SelectedWord from './SelectedWord';

const Word = ({word, word_number, selected, select_mode, left, right, up}) => {
    const theWord = wordify(words[word], word_number) + " ";
    const editing = selected && !select_mode;
    let nextLeft, nextRight, previous;
    if(editing) {
        nextLeft = wordify(words[word*2], word_number);
        nextRight = wordify(words[word*2+1], word_number);
        previous = wordify(words[Math.floor(word/2)], word_number);
    }
    return selected ?
        <SelectedWord theWord={theWord} nextLeft={nextLeft} left={ left } nextRight={nextRight} right={ right } previous={previous} up={ up } editing={editing}/> :
        <span>{theWord}</span>;
}

export default Word;