import React from 'react';

// just one method 'render' from react-dom rather than whole thing
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

// styles
import './styles/css/styles.css';

// components
import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';

// other
import registerServiceWorker from './registerServiceWorker';



// using react router to handle URLs / rewriting
const Root = () => {
  return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={App} />
          <Match exactly pattern="/About" component={About} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    )
}


render(<Root/>, document.querySelector('#app'));

registerServiceWorker();
