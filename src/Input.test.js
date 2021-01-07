import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input from './Input';

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
    test('renders component without error', () => {
      

    });
    test('renders input box', () => {

    });
    test('renders submit button', () => {

    });

  });
  describe('word has  been guessed',() => {
    test('renders component without error', () => {

    });
    test('does not renders input box', () => {

    });
    test('does not renders submit button', () => {

    });

  });

});

describe('update state', () => {

});