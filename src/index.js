import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import Layout from './components/Layout';
ReactDOM.render((
	 <Provider store={store}>
      <ConnectedRouter history={history}>
         <Layout> 
           <Main />
         </Layout>
    </ConnectedRouter>
  </Provider>
    ),document.getElementById('root')
);
registerServiceWorker();

          