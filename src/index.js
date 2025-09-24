import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'


import { AppRouter } from './router/AppRouter'
import store from './store'
import './i18n'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <AppRouter />
  </Provider>,
)
