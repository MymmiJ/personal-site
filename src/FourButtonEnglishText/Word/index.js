import Words from '../words-btree-array';
import { wordify } from '../wordify';
import SelectedWord from './SelectedWord';

const wordList = JSON.parse(Words);

const Word = ({word, word_number, selected, select_mode, left, right, up, down}) => {
    const theWord = wordify(wordList[word], word_number) + " ";
    const editing = selected && !select_mode;
    let nextLeft, nextRight, previous;
    if(editing) {
        nextLeft = wordify(wordList[word*2], word_number);
        nextRight = wordify(wordList[word*2+1], word_number);
        previous = wordify(wordList[Math.floor(word/2)], word_number);
    }
    return selected ?
        <SelectedWord theWord={theWord} nextLeft={nextLeft} left={ left } nextRight={nextRight} right={ right } previous={previous} up={ up } editing={editing} down={ down }/> :
        <span>{theWord}</span>;
}

export default Word;