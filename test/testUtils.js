import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../src/reducers';
import { middlewares } from '../src/configureStore';


 
/**
 * Create a testing store with imported reducers, middleware and initial state.
 * globals: rootReducer.
 * @param {object} initialState - Initial state for store.
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState) => {
  const createStoreWithMiddlewares = applyMiddleware(...middlewares) (createStore);
  return createStoreWithMiddlewares(rootReducer, initialState);
}

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper -Enyzme shallow wrapper
 * @param {string} val - Value of data-test attribute for search
 * @returns { ShallowWrapper }
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
}


export const checkProps = (component, confirmingProps) => {
  const propError = checkPropTypes(component.propTypes,
    confirmingProps,
    'prop',
    component.name);
    expect(propError).toBeUndefined();
};

