
import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from '../actions';

describe('getSecretWord action creator', () => {
  beforeEach(() => {
    moxios.install();

  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('adds response word to state', () => {
    const secretWord = 'party';
    const store = storeFactory();

    moxios.wait(() => {
      const requests = moxios.requests.mostRecent();
      requests.respondWith({
        status: 200,
        response: secretWord,
      });     
    });
    return store.dispatch(getSecretWord())
      .then(() => {
        const newState = store.getState();
        console.log("newState", newState);
        expect(newState.secretWord).toBe(secretWord);
      })
  });
});