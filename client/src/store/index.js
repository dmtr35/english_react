import { createStore, combineReducers } from 'redux'
import {isAuthReducer} from '../store/userReducer'









const rootReducer = combineReducers({
    isAuthReducer
})








export const store = createStore(rootReducer)











