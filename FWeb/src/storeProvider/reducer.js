import reducerProvider from "./reducerProvider"
import { combineReducers } from "redux"
import reducerProduct from "./reducerProduct"

const reducer = combineReducers({provider: reducerProvider, product: reducerProduct })

export default reducer