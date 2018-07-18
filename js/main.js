import $ from 'jquery';
import {Feed} from '../js/feed';
import '../scss/styles.scss';
import '../css/normalize.css';


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
