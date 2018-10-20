import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router} from 'react-router-dom';

const { persistor, store } = configureStore()

ReactDOM.render((
	<Provider store={store}>
	 <PersistGate loading={null} persistor={persistor}>
       <Router>
         <Main />
       </Router>
     </PersistGate>
    </Provider>
    ),document.getElementById('root')
);
registerServiceWorker();

          