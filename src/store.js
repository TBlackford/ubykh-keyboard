import create from "zustand";

const useStore = create(set => ({
    letters: [],

    addLetter: (letter) => set(state => ({letters: [...state.letters, letter]})),
    addLetters: (letters) => set(state => ({letters: [...state.letters, ...letters]})),
    removeLastLetter: () => set(state => ({letters: state.letters.slice(0, -1)})),
    clearLetters: () => set(state => ({letters: []})),
}))

export default useStore;

