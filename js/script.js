let {log} = console;
let input = document.querySelector('.user-input-text input');
log(input);
let postbtn = document.querySelector('.postbtn');

postbtn.addEventListener('click', addpost);

function addpost() {
    let div = document.createElement('DIV');
    let posts = document.querySelector('.posts-area');
    // div.className = 'post';
    // div.classList.add('template');
    div.innerHTML = `<div class="private-post template">
    <div class="post-header">
        <figure class="publisher flex-item">
            <img src="img/userpic.jpg" alt="">
            <figcaption class="publisher-info"> 
                <span class="color-blue publisher-name">yana</span>
                <span class="post-date"><span class="post-type-icon"><i class="fas fa-user-friends"></span></i> </span>
            </figcaption>
        </figure>
        <a href="#">
            <i class="fas fa-ellipsis-h"></i>
        </a>
    </div>
    <div class="post-body1">
        <p class="post-title light-padded heb">
            asdfksdbfbdfg
        </p>
        <div class="post-comments-bottom">
            <a href="#">
                <i class="far fa-thumbs-up"></i>
                <span> Like </span>
            </a>
            <a href="#">
                <i class="far fa-comment"></i>
                <span> Comment </span>
            </a>
        </div>
    </div>
</div>`;
    posts.insertBefore(div,posts.firstChild);
    
}





