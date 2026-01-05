export interface ScrambleWordsState {
    currentWord: string;
    errorCounter: number;
    guess: string;
    isGameOver: boolean;
    maxAllowErrors: number;
    maxSkips: number;
    points: number;
    scrambledWord: string;
    skipCounter: number;
    totalWords: number;
    words: string[];
}

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]): string[] => {
    return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = ''): string => {
    if (word === '') return word;

    const newWord = word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');

    if (newWord === word) return scrambleWord(word);

    return newWord;
};

const GAME_WORDS = [
    'REACT',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'HTML',
    'ANGULAR',
    'SOLID',
    'NODE',
    'VUEJS',
    'SVELTE',
    'EXPRESS',
    'MONGODB',
    'POSTGRES',
    'DOCKER',
    'KUBERNETES',
    'WEBPACK',
    'VITE',
    'TAILWIND',
];

export type ScrambleWordsActions =
    { type: 'CHECK_GUESS' }
    | { type: 'NEW_GAME', payload: ScrambleWordsState }
    | { type: 'SET_GUESS', payload: string }
    | { type: 'SKIP_WORD' };

export const getInitialState = (): ScrambleWordsState => {
    const shuffledWords: string[] = shuffleArray([ ...GAME_WORDS ]);
    const currentWord: string = shuffledWords[0];

    return {
        currentWord,
        errorCounter: 0,
        guess: '',
        isGameOver: false,
        maxAllowErrors: 3,
        maxSkips: 3,
        points: 0,
        scrambledWord: scrambleWord(currentWord),
        skipCounter: 0,
        totalWords: shuffledWords.length,
        words: shuffledWords,
    }
}

export const scrambleWordsReducer = (state: ScrambleWordsState, action: ScrambleWordsActions): ScrambleWordsState => {
    switch (action.type) {
        case 'SET_GUESS': {
            return { ...state, guess: action.payload.trim().toUpperCase() };
        }
        case 'CHECK_GUESS': {
            if (state.currentWord === state.guess) {
                const newWords: string[] = state.words.filter(word => word !== state.currentWord);
                const newCurrentWord: string = newWords[0];

                return {
                    ...state,
                    currentWord: newCurrentWord,
                    guess: '',
                    points: state.points + 1,
                    scrambledWord: scrambleWord(newCurrentWord),
                    words: newWords,
                }
            }

            return {
                ...state,
                errorCounter: state.errorCounter + 1,
                guess: '',
                isGameOver: (state.errorCounter + 1) >= state.maxAllowErrors
            }
        }
        case 'SKIP_WORD': {
            if (state.skipCounter >= state.maxSkips) return state;

            const newWords: string[] = state.words.filter(word => word !== state.currentWord);
            const newCurrentWord: string = newWords[0];

            return {
                ...state,
                currentWord: newCurrentWord,
                guess: '',
                scrambledWord: scrambleWord(newCurrentWord),
                skipCounter: state.skipCounter + 1,
                words: newWords,
            }
        }
        case 'NEW_GAME': {
            return action.payload;
        }
        default:
            return state;
    }
}
