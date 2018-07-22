import React from 'react';
import ReactDOM from 'react-dom';
import EmailSystemApp from './EmailSystemApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmailSystemApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
