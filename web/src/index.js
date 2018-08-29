import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import blearnReducer from './reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(blearnReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker();