import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserStore from './store/UserStor'
import CollectionStore from './store/CollectionsStor'

import { Provider } from 'react-redux'
import { store } from './store/index'


export const Context = createContext(null)








const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    fullCollections: new CollectionStore()
  }}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Context.Provider>
)

