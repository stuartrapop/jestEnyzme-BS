import { getLetterMatchCount } from '../helpers/index';


export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
};

/**
 * @function currectGuess
 * @returns {object} - Action object with type 'CORRECT_GUESS'
 */
/*  Replaced in video 75 for dispatch
export function correctGuess() {
  return { type: actionTypes.CORRECT_GUESS };
} */


/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action 
 *    and conditionally CORRECT_GUESS action
 * @function guessWord
 * @param { string } guessedWord - Guessed word
 * @returns  {function}    - Redux Thunk function 
 */
export const guessWord = (guessedWord) => {
  return function(dispatch, getState)  {
    const {secretWord} = getState();
    const letterMatchCount = getLetterMatchCount(guessedWord,secretWord );

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: {
        guessedWord,
        letterMatchCount,
      },
    });
    if (guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS,    
      });
    }

  };

};