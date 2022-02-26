import React, { useEffect, useState } from 'react';
import useStore from './store';

import Keyboard, { all_letters } from './Keyboard';

import './App.css';

const formatLetters = (letters) => {
    let output = '';

    for (const key in letters) {
        output += letters[key];
    }
    return output;
}

//TODO: translate letters from latin to IPA and back again
const translateLetters = (letters) => {
    let output = '';

    for (const key in letters) {
        output += letters[key];
    }
    return output;
}


function App() {
    // Local state
    const [keyboardType, setKeyboardType] = useState('IPA');
    const [isError, setIsError] = useState(false);

    // Zustand
    const letters = useStore(state => state.letters);
    // Functions
    const addLetter = useStore(state => state.addLetter);
    const removeLastLetter = useStore(state => state.removeLastLetter);
    const clearLetters = useStore(state => state.clearLetters);

    let output = formatLetters(letters);

    const onChange = (event) => {
        const to_add = event.nativeEvent.data;
        setIsError(false);
    }

    const KeyboardSwapOnClick = () => {
        setKeyboardType(keyboardType === 'IPA' ? 'UBYKH' : 'IPA');
        output = translateLetters(letters);
    }

    useEffect(() => {
        const onKeyPress = (event) => {
            if (!event.altKey && !event.ctrlKey && all_letters.includes(event.key)) {
                addLetter(event.key);
            }
            else {
                if (event.key === 'Backspace') {
                    removeLastLetter();
                } else {
                    setIsError(true);
                }
            }
        }

        document.addEventListener("keydown", onKeyPress, false);

        return () => {
            document.removeEventListener("keydown", onKeyPress, false);
        };
    }, [addLetter, removeLastLetter]);


    return (
        <div className="container pt-10">
            <div className="grid place-items-center w-screen">
                { isError ? <p>You can only enter the below letters.</p> : null }
                <div className="flex flex-col divide-y">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => KeyboardSwapOnClick()}>
                        Swap to {keyboardType === 'IPA' ? 'Latin' : 'IPA'}
                    </button>
                    <div className="grid grid-cols-3 gap-2 pt-1">

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => removeLastLetter()}>
                            Backspace
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => addLetter(' ')}>
                            Space Bar
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => clearLetters()}>
                            Clear
                        </button>
                    </div>
                </div>

                {/*TODO: add in onChange event*/}
                <div className="max-w-screen-xl pt-5">
                    <textarea className="font-sans block text-sm leading-5 w-full py-2 px-3 border-2 border-gray-500 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
                        rows="8" cols="100" value={output} readOnly={true} onChange={(event) => onChange(event)} />
                </div>

                <div className="max-w-screen-xl pt-5">
                    <Keyboard keyboardType={keyboardType} />
                </div>
            </div>
        </div>
    );
}

export default App;
