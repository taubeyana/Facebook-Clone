new Feed(document.querySelector('.newsfeed'),5);

let body = document.querySelector('body');
let extendedInput = document.querySelector('.extend-user-input');

body.addEventListener('click',(event) => {
    if (event.target.className === 'user-input-textarea') {
        extendedInput.style.display = 'block';
    }
});
body.addEventListener('click',(event) => {
    if (event.target.className !== 'user-input-textarea') {
        extendedInput.style.display = 'none';
    }
});
