import AddStoreProvider from './AddStoreProvider.js';
import * as actions from './actionTypes.js';

let nextId = 0
export const provider_state = AddStoreProvider()
console.log(provider_state)

export default function reducerProvider(state = provider_state, action) {
  switch (action.type) {
    case actions.PROVIDER_ADD:
      return [state.provider, {
        provider_id: nextId++,
        provider_name: action.payload.provider_name,
        INN: action.payload.INN,
        contact_details: action.payload.contact_details,
        RF: action.payload.RF,
        status: action.payload.status,
        rating: action.payload.rating
        }];
    case actions.PROVIDER_UPDATE:
      const updateState = [...state]
      const indexElement = updateState.findIndex((provider) => Number(provider.provider_id) === Number(action.payload.provider_id))
      updateState[indexElement] = action.payload
      return updateState
    case actions.PROVIDER_STATUS:
      const updateStateStatus = [...state]
      const indexElementStatus = updateStateStatus.findIndex((provider) => Number(provider.provider_id) === Number(action.payload.provider_id))
      console.log(action.payload)
      if (action.payload.status === "Active"){
        updateStateStatus[indexElementStatus].status = "Passive"
      }
      else{
        updateStateStatus[indexElementStatus].status = "Active"
      }
      return updateStateStatus
    case actions.PROVIDER_DELETE:
      /*const index = state.findIndex((provider) => Number(provider.provider_id) === Number(action.payload.provider_id))
      state.splice(index, 1)
      console.log(state)
      return  state*/
      return state.filter((provider) => action.payload.provider_id !== provider.provider_id);

    default:
      return state;
    }
}