import { render } from 'react-dom';

import App from './App';
import { APP_ROOT_ID } from './constants';

render(App(), document.getElementById(APP_ROOT_ID));
