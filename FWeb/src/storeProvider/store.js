import { createStore } from 'redux';
import reducer from './reducer.js'
import { provider_state } from './reducerProvider.js';
import { product_state } from './reducerProduct.js';

export const initialState = {
    provider : provider_state,
    product : product_state
}
const store = createStore(reducer, initialState );
export {store}
