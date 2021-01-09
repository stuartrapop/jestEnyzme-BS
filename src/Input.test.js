import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';

/** 
 * Factor function ot create a Shallow Wrapper for the Input component
 * @function setup
 * @param {object} - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store}/>).dive().dive();
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed',() => {
    let wrapper;
    beforeEach(() => { 
      const initialState = { success: false};
      wrapper = setup(initialState); 
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });
  describe('word has  been guessed',() => {
    let wrapper;
    const initialState = {success: true};
    wrapper = setup(initialState);
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper,'component-input');
      expect(component.length).toBe(1);
    }); 
    test('does not renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });
    test('does not renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect (successProp).toBe(success);
  });
  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;

    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('`guessWord` action creator using mock function', () => {

  let guessWordMock;
  let wrapper;
  const guessedWord = "train";
  beforeEach(() => {
    //create a mock function for getSecretWord
    guessWordMock = jest.fn();

    const props = {
      guessWord: guessWordMock,
    }

    //set up Input with guessWordMock as a prop
    wrapper = shallow(<UnconnectedInput {...props} />);

    //add value to input box
    wrapper.setState({currentGuess: guessedWord});


    //simulate click on submit button
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', {preventDefault()  {} });
  })

  



  test('action creater called when submit button called', () => {

    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  test('calls guessedWord with input value as argument', () => {

    console.log(guessWordMock.mock.calls);
    const guessedWordArg = guessWordMock.mock.calls[0][0];

    expect(guessedWordArg).toBe(guessedWord);
  })

})