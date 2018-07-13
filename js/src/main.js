require('jquery');
require('feed');
// require('user');
// require('feed');
// require('services');
// require('post');
// require('likes');
// require('postOptions');
// require('postComments');
// require('main');

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
