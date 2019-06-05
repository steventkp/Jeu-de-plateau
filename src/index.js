if (process.env.NODE_ENV === 'development') {
    console.log('Tu es dans le mode développement ! ')
    require('file-loader!../src/index.html');
}
require('../src/assets/stylesheets/styles.scss');

import './main.js';