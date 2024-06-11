import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './reducer';
import cartReducer from './cartReducer';
import {loadFromLocalStorage, loadState, saveState} from './localStorage';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    saveState({
        cart: store.getState().cart
    });
    saveState(store.getState());
});

export default store;