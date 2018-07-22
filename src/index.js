import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EmailSystemApp from './client/view/EmailSystemApp';
import registerServiceWorker from './client/registerServiceWorker';

ReactDOM.render(<EmailSystemApp />, document.getElementById('root'));
registerServiceWorker();
