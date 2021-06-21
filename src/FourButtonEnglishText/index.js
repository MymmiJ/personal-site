import { useState } from 'react';
import { words as wordList } from './words-btree-array';
import { left_arrow, right_arrow, up_arrow, down_arrow } from './constants';
import useEventListener from '../Events/useEventListener';
import Word from './Word';

const FourButtonEnglishText = () => {
    //keeping track of position
    const [word_number, setWordNumber] = useState(0);
    const [btree_word, setBTreeWord] = useState(1);
    const [words, setWords] = useState([1]);
    const [select_mode, setSelectMode] = useState(false);

    const selectPreviousWord = () => {
        if(word_number > 0) {
            setWordNumber(n => n-1);
        }
    }
    const selectNextWord = () => {
        if(word_number < words.length) {
            setWordNumber(n => n+1);
        }
    }
    const deleteCurrentWord = () => {
        setWords( words => words.slice(0, word_number).concat(words.slice(word_number+1)) );
    };
    const editCurrentWord = () => {
        let wordNum = word_number;
        if(!words[wordNum]) {
            updateWordsWithWord(btree_word);
        }
        if(wordNum <= 0) {
            wordNum = 0;
            setWordNumber(wordNum);
        }
        setSelectMode(false);
    }
    const updateWordsWithWord = (word) => {
        setWords(words => {
            words[word_number] = word;
            return words;
        })
    }
    const btreeLeft = () => {
        const nextWord = 2*btree_word;
        if(wordList[nextWord]) {
            updateWordsWithWord(nextWord);
            setBTreeWord(nextWord);
        }
    }
    const btreeRight = () => {
        const nextWord = (2*btree_word)+1;
        if(wordList[nextWord]) {
            updateWordsWithWord(nextWord);
            setBTreeWord(nextWord);
        }
    }
    const btreeUp = () => {
        if(btree_word > 1) {
            const nextWord = Math.floor(btree_word/2);
            updateWordsWithWord(nextWord);
            setBTreeWord(nextWord);
        } else {
            setSelectMode(true);
            setWords(words => words.slice(0,word_number).concat(words.slice(word_number+1)));
            setWordNumber(n => n-1 < 0 ? 0 : n-1);
        }
    }
    const confirmWord = () => {
        setSelectMode(true);
        setBTreeWord(1);
        setWordNumber(n => n+1);
    }

    let left, right, up, down;
    if(select_mode) {
        left = selectPreviousWord;
        right = selectNextWord;
        up = deleteCurrentWord;
        down = editCurrentWord;
    } else {
        left = btreeLeft;
        right = btreeRight;
        up = btreeUp;
        down = confirmWord;
    }

    const four_button_control = (e) => {
        const key = e.which || e.keyCode;
        if(key === left_arrow) {
            left();
        } else if(key === right_arrow) {
            right();
        } else if(key === up_arrow) {
            up();
        } else if(key === down_arrow) {
            down(); 
        }
    }
    useEventListener('keydown', four_button_control);

    return <div>
        <p><strong>UP ARROW</strong> deletes an entry or returns you to the middle of the alphabet</p>
        <p><strong>LEFT ARROW</strong> moves the cursor left one word or selects a word earlier in the alphabet</p>
        <p><strong>RIGHT ARROW</strong> moves the cursor right one word or selects a word later in the alphabet</p>
        <p><strong>DOWN ARROW</strong> selects the current word or confirms the word that you already selected</p>
        <p>The project is made of two parts, the dictionary and the interface.
            The dictionary was created using Racket, ingesting a plain text list of English words and translating them into an implicit binary tree, where a left key is 2n and a right key is 2n+1.
            The interface was created using vanilla JS, and has been ported to React; the code is no longer very much like it looked once, but it's compatible with this website!
            React is so much easier than vanilla JS that a couple small extra features were added (clicking as well as arrow keys to change language), and some bugfixes introduced.
            Otherwise, functionality is on par with the project as originally created.
        </p>
        <hr></hr>
        <p>{words.map((word,i) =>
        <Word
            key={ `${word}-${i}` }
            word={ word }
            left={ left }
            right={ right }
            up={ up }
            selected={ word_number === i }
            select_mode={ select_mode }
            word_number={ i }
        />)}{word_number === words.length && <span>&gt;&gt;</span>}</p>
    </div>;
};

export default FourButtonEnglishText;