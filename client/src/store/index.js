import { createStore, combineReducers } from 'redux'
import { isAuthReducer } from '../store/userReducer'
import { collectionsReducer } from '../store/collectionsReducer'









const rootReducer = combineReducers({
    isAuthReducer,
    collectionsReducer
})








export const store = createStore(rootReducer)











