import AddStoreProduct from './AddStoreProduct.js';
import * as actions from './actionTypes.js';

export const product_state = AddStoreProduct()

export default function reducerProduct(state = product_state, action) {
  switch (action.type) {
    case actions.PRODUCT_ADD:
      return [...state, {
        //id: lastId++,
        provider_id: action.payload.provider_id,
        //element_id: action.payload.element_id,
        element_name: action.payload.element_name,
        quantity: action.payload.quantity,
        price: action.payload.price,
        amount: action.payload.amount,
        deadline: action.payload.deadline,
      }];
    case actions.PRODUCT_DELETE:
      /*const index = state.findIndex((product) => Number(product.element_id) === Number(action.payload.element_id))
      state.splice(index, 1)

      
      //state = state.filter((product) => Number(product.element_id) !== Number(action.payload.element_id))
      //state.shift()
      console.log(state)
      return  state*/
      return state.filter((product) => Number(action.payload.element_id) !== Number(product.element_id));

    case actions.PRODUCT_DELETE_PROVIDER:
      return state.filter((product) => Number(action.payload.provider_id) !== Number(product.provider_id));

    case actions.PRODUCT_UPDATE:
      const updateState = [...state]
      const indexElement = updateState.findIndex((product) => Number(product.element_id) === Number(action.payload.element_id))
      updateState[indexElement] = action.payload
      return  updateState 
    default:
      return state;
    }
}