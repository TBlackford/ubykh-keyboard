import React from 'react';
import useStore from './store';

const Keyboard = ({keyboardType, addLetters}) => {
    switch (keyboardType) {
        case 'UBYKH': return <UbykhKeyboard addLetters={addLetters} />
        case 'IPA': return <IpaKeyboard addLetters={addLetters} />
        default: return <p>Error</p>
    }
}

const ubykh_keyboard_letters = {
    'vowels': ['a', 'e', 'ı', 'á', 'é', 'í'],
    'labials': ['p', 'b', 'p\'', 'ph', 'bh', 'p\'h', 'f', 'v', 'vh', 'm', 'mh'],
    'alveolars': ['t', 'd', 't\'', 'tu', 'du', 't\'u', 's', 'z', 'ts', 'dz', 'ts\'', 'n', 'r', 'lh', 'l\'h', 'l'],
    'post-alveolars': ['ç', 'c', 'ç\'', 'ş', 'j', 'şu', 'ju'],
    'alveolo-palatals': ['çi', 'ci', 'ç\'i', 'çü', 'cü', 'ç\'ü', 'şi', 'ji', 'şü', 'jü'],
    'retroflex': ['çr', 'cr', 'ç\'r', 'şr', 'jr'],
    'palatal': ['j'],
    'velar': ['k', 'g', 'k\'', 'ku', 'gu', 'k\'u', 'ki', 'gi', 'k\'i', 'x̂', 'ĝ', 'w', 'wh'],
    'uvular': ['q', 'qu', 'qi', 'qh', 'qö', 'q\'', 'q\'u', 'q\'i', 'q\'h', 'q\'ö', 'x', 'xu', 'xi', 'xh', 'xö', 'ğ', 'ğu', 'ği', 'ğh', 'ğö'],
    'glottal': ['h'],
}

const ipa_keyboard_letters = {
    'vowels': ['ɐ', 'ɜ', 'ɨ', 'ɐ́', 'ɜ́', 'ɨ́'],
    'labials': ['p', 'b', 'pʼ', 'pˤ', 'bˤ', 'pˤʼ', 'f', 'v', 'vˤ', 'm', 'mˤ'],
    'alveolars': ['t', 'd', 'tʼ', 'tʷ', 'dʷ', 'tʷʼ', 's', 'z', 'ts', 'dz', 'tsʼ', 'n', 'r', 'ɬ', 'ɬʼ', 'l'],
    'post-alveolars': ['tʃ', 'dʒ', 'tʃʼ', 'ʃ', 'ʒ', 'ʃʷ', 'ʒʷ'],
    'alveolo-palatals': ['tɕ', 'dʑ', 'tɕʼ', 'tɕʷ', 'dʑʷ', 'tɕʷʼ', 'ɕ', 'ʑ', 'ɕʷ', 'ʑʷ'],
    'retroflex': ['ʈʂ', 'ɖʐ', 'ʈʂʼ', 'ʂ', 'ʐ'],
    'palatal': ['y'],
    'velar': ['k', 'g', 'kʼ', 'kʷ', 'gʷ', 'kʷʼ', 'kʲ', 'gʲ', 'kʲʼ', 'x', 'ɣ', 'w', 'wˤ'],
    'uvular': ['q', 'qʷ', 'qʲ', 'qˤ', 'qʷˤ', 'qʼ', 'qʷʼ', 'qʲʼ', 'qˤʼ', 'qʷˤʼ', 'χ', 'χʷ', 'χʲ', 'χˤ', 'χʷˤ', 'ʁ', 'ʁʷ', 'ʁʲ', 'ʁˤ', 'ʁʷˤ'],
    'glottal': ['h'],
}

export const all_letters = [
    'a', 'e', 'ı', 'á', 'é', 'í',
    'p', 'b', 'p\'', 'ph', 'bh', 'p\'h', 'f', 'v', 'vh', 'm', 'mh',
    't', 'd', 't\'', 'tu', 'du', 't\'u', 's', 'z', 'ts', 'dz', 'ts\'', 'n', 'r', 'lh', 'l\'h', 'l',
    'ç', 'c', 'ç\'', 'ş', 'j', 'şu', 'ju',
    'çi', 'ci', 'ç\'i', 'çü', 'cü', 'ç\'ü', 'şi', 'ji', 'şü', 'jü',
    'çr', 'cr', 'ç\'r', 'şr', 'jr',
    'k', 'g', 'k\'', 'ku', 'gu', 'k\'u', 'ki', 'gi', 'k\'i', 'x̂', 'ĝ', 'w', 'wh',
    'q', 'qu', 'qi', 'qh', 'qö', 'q\'', 'q\'u', 'q\'i', 'q\'h', 'q\'ö', 'x', 'xu', 'xi', 'xh', 'xö', 'ğ', 'ğu', 'ği', 'ğh', 'ğö',
    'h', // doubles up with IPA
    'ɐ', 'ɜ', 'ɨ', 'ɐ́', 'ɜ́', 'ɨ́',
    'p', 'b', 'pʼ', 'pˤ', 'bˤ', 'pˤʼ', 'f', 'v', 'vˤ', 'm', 'mˤ',
    't', 'd', 'tʼ', 'tʷ', 'dʷ', 'tʷʼ', 's', 'z', 'ts', 'dz', 'tsʼ', 'n', 'r', 'ɬ', 'ɬʼ', 'l',
    'tʃ', 'dʒ', 'tʃʼ', 'ʃ', 'ʒ', 'ʃʷ', 'ʒʷ',
    'tɕ', 'dʑ', 'tɕʼ', 'tɕʷ', 'dʑʷ', 'tɕʷʼ', 'ɕ', 'ʑ', 'ɕʷ', 'ʑʷ',
    'ʈʂ', 'ɖʐ', 'ʈʂʼ', 'ʂ', 'ʐ',
    'y',
    'k', 'g', 'kʼ', 'kʷ', 'gʷ', 'kʷʼ', 'kʲ', 'gʲ', 'kʲʼ', 'x', 'ɣ', 'w', 'wˤ',
    'q', 'qʷ', 'qʲ', 'qˤ', 'qʷˤ', 'qʼ', 'qʷʼ', 'qʲʼ', 'qˤʼ', 'qʷˤʼ', 'χ', 'χʷ', 'χʲ', 'χˤ', 'χʷˤ', 'ʁ', 'ʁʷ', 'ʁʲ', 'ʁˤ', 'ʁʷˤ',
    ' '
]

const onButtonClick = (event, item, addLetter) => {
    addLetter(item);
}

const KeyboardButton = ({item}) => {
    const addLetter = useStore(state => state.addLetter);

    return (
        <button key={item} onClick={(event) => onButtonClick(event, item, addLetter)}
                   className="keyboard-btn bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        >
            {item}
        </button>
    )
}

const UbykhKeyboard = () => {
    return (
        <div>
            {Object.keys(ubykh_keyboard_letters).map(key => {
                return (
                    <>

                        <p className="font-medium" key={key}>{ key }</p>

                        <div className="grid grid-cols-12 gap-2">
                            {ubykh_keyboard_letters[key].map(item =>
                                <KeyboardButton item={item} />
                            )}
                        </div>
                    </>
                )
            })}
        </div>
    )
}

const IpaKeyboard = () => {
    return (
        <div>
            {Object.keys(ipa_keyboard_letters).map(key => {
                return (
                    <>
                        <p className="font-medium" key={key}>{ key }</p>

                        <div className="grid grid-cols-12 gap-2">
                            {ipa_keyboard_letters[key].map(item =>
                                <KeyboardButton item={item} />
                            )}
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Keyboard;
export {
    UbykhKeyboard, IpaKeyboard
}
