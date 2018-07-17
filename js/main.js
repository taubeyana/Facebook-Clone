const $ = require('jquery');
let Feed = require('../js/feed');
require('../scss/styles.scss');



const {log} = console;

new Feed($('.newsfeed'),5);

let body = $('body');
let extendedInput = $('.extend-user-input');

body.on('click',(event) => {
    if (event.target.className === 'user-input-textarea') {
        extendedInput.slideDown();
    }
});
body.on('click',(event) => {
    if (event.target.className !== 'user-input-textarea') {
        extendedInput.slideUp();
    }
});
