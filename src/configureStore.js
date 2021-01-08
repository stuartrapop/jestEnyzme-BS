import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';


export const middlewares = [ReduxThunk];
// used documentation for creating store with instructions different from course

export default createStore(rootReducer, applyMiddleware(...middlewares))
