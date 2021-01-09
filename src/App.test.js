import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';


import App, { UnconnectedApp } from './App';
import { storeFactory } from '../test/testUtils';


const setup = ( initialState = { }) => {
  const store = storeFactory( initialState);
  const wrapper = shallow( <App store={store}/>).dive().dive();
  return wrapper;
}

test('renders App component', () => {
 
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper,'component-app');
 
  expect(appComponent.length).toBe(1);
});

test('App component receives state as prop', () => {
  let initialState = {
    success: false,
    guessedWords: [{guessedWord: 'train', letterMatchCount: 3}],
    secretWord:'party',
  }
  const wrapper = setup(initialState);
  const appProps = wrapper.instance().props;
  expect(appProps.secretWord).toBe(initialState.secretWord);
  expect(appProps.success).toBe(initialState.success);
  expect(appProps.guessedWords).toEqual(initialState.guessedWords);
});

test('getSecretWord action creator is a function on the props',() => {
  const wrapper = setup();
  const getSecretWordProp = wrapper.instance().props.getSecretWord;
  expect(getSecretWordProp).toBeInstanceOf(Function);
})


test('`getSecretWord` runs on App mount',() => {
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: [{guessedWord: 'train', letterMatchCount: 3}],
  }

  // set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);

});