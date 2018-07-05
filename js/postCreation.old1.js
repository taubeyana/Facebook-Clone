let {log} = console;

class PostsService {
    getPosts() {
        fetch('http://127.0.0.1:3000').then(data => {
            data.json().then(myjson => {
                let posts = myjson.posts;
                let feed = document.querySelector('.posts-area');
                posts.forEach(post => {
                    let user =  new User(post.user.firstName, post.user.lastName,post.user.image);
                    let newpost = new DynamicPost(user,post.message,post.likes, post.lang);
                    feed.insertBefore(newpost.div, feed.firstChild);
                });
                localStorage.setItem('posts', JSON.stringify(myjson));
            });
        }).catch(() => {
                log('Offline mode');
                let feed = document.querySelector('.posts-area');
                let offlinePosts = JSON.parse(localStorage.getItem('posts'));
                offlinePosts.posts.forEach(post => {
                    let user =  new User(post.user.firstName, post.user.lastName,post.user.image);
                    let newpost = new DynamicPost(user,post.message,post.likes, post.lang);
                    feed.insertBefore(newpost.div, feed.firstChild);
            }); 
        });
    }
}

let postsservice = new PostsService();
postsservice.getPosts();


class User {
    constructor(firstName, lastName, userPic) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userPic = userPic;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class Feed {
    constructor(postEl) {
        this.postEl = postEl;
        this.user = new User('Yana', 'Taube',"img/userpic.jpg");
        this.input = postEl.querySelector('.user-input-text textarea');
        this.postbtn = postEl.querySelector('.postbtn');
        this.postsArea = postEl.querySelector('.posts-area');
        this.postbtn.addEventListener('click', () => this.createPost());
    }
    createPost() {
        let userInput = this.input.value;
        this.input.value =  '';
        let post = new Post(this.user,  userInput);
        this.postsArea.insertBefore(post.div, this.postsArea.firstChild);
    }
}

class Post {
    constructor(user, userInput, lang = '') {
        this.user = user;
        this.userInput = userInput;
        this.lang = lang;
        this.date = new Date;
        this.div = document.createElement('DIV');
        this.div.innerHTML = `<div class="post template">
        <div class="post-header">
            <figure class="publisher flex-item">
                <img src=${this.user.userPic}>  
                <figcaption class="publisher-info"> 
                    <span class="publisher-name color-blue">${this.user.fullName}</span>
                    <div class="post-info">
                        <span class="post-date">${this.date.getHours()}:${this.date.getMinutes()} </span>
                        <span class="post-type-icon"><i class="fas fa-user-friends"></i></span>
                    </div>
                </figcaption>
            </figure>
            <div class="post-options">
                <i class="fas fa-ellipsis-h"></i>
                <div class="post-options-menu">
                    <div class="bg"></div>
                    <div class="edit-post">
                        <span> Edit Post </span>
                        <div class="edit-post-area" >
                            <textarea type="text" value=""></textarea>
                            <button class="save-btn btn">Save</button>
                        </div>
                    </div>
                    <div class="remove-post">
                        <span> Remove Post </span>
                    </div>
                </div>
            </div>
        </div>
        <p class="post-text light-padded ${this.lang}">
            ${this.userInput}
        </p>
        <div class="post-user-action">
            <button class="like white-btn btn">
                <i class="far fa-thumbs-up"></i>
                <span> Like </span>
            </button>
            <button class="white-btn btn">
                <i class="far fa-comment"></i>
                <span> Comment </span>
            </button>
            <button class="white-btn btn" style="display: none;">  <!--change this!!!-->
                <i class="far fa-share-square"></i>
                <span> Share </span>
            </button>
        </div>
        </div>
        <div class="post-likes">
            <img src="img/like.png" alt="">
            <span class="likes-num"></span>
        </div>
        <div class="post-comments">
            <div class="post-comments-area">
                <div class="comment">
                    <div class="user-info">
                        <img src="${this.user.userPic}" alt="userpic">
                        <div class="user-comment">
                            <span class="color-blue">${this.user.fullName}</span> 
                            <p class="user-comment-text"></p>
                        </div>
                    </div>
                </div> 
            </div>



            <div class="personal-comment">
                <img src="img/userpic.jpg" alt="userpic">
                <div class="personal-comment-input-and-icons">
                    <input type="text" placeholder="Write a Comment...">
                    <i class="far fa-smile"></i>
                    <i class="fas fa-camera"></i>
                </div>
            </div>
        </div>`;
     
    this.removebtn = this.div.querySelector('.remove-post');
    this.editBtn = this.div.querySelector('.edit-post');
    this.textarea = this.div.querySelector('.edit-post-area textarea');
    this.textarea.innerText = this.userInput;
    this.postBody = this.div.querySelector('.post-text');
    this.postOptions = this.div.querySelector('.post-options-menu');
    this.showPostOptions = this.div.querySelector('.fa-ellipsis-h');
    this.likeBtn = this.div.querySelector('.post-user-action .like');
    this.commentsArea = this.div.querySelector('.post-comments-area');
    this.likes = 0;
    this.listeners();
    
    }
    listeners() {
        this.removebtn.addEventListener('click', () => this.removePost());
        this.editBtn.addEventListener('click', () => this.editPost());
        this.postOptions.addEventListener('mouseleave', () => this.postOptions.style.display = 'none');
        this.showPostOptions.addEventListener('click', () => this.postOptions.style.display = 'flex');
        this.likeBtn.addEventListener('click', () => this.reactionsCounter());

    }
    removePost() {
        this.div.parentNode.removeChild(this.div);
    }
    
    editPost() {
        this.textarea.parentNode.style.display = 'block';
        this.saveBtn = this.div.querySelector('.edit-post-area .save-btn');
        this.saveBtn.addEventListener('click', () =>{
            this.postBody.innerText = this.textarea.value;
        });
    }
    reactionsCounter() {
        this.reactions = this.div.querySelector('.post-likes');
        this.reactions.style.display = 'flex';
        this.likes++;
        this.likesNum = this.div.querySelector('.likes-num');
        this.likesNum.innerText = this.likes;
    }
}  
class DynamicPost {
    constructor(user, message,likes, lang = '') {
        this.user = user;
        this.message = message;
        this.lang = lang;
        this.date = new Date;
        this.div = document.createElement('DIV');
        this.div.innerHTML = `<div class="post template">
        <div class="post-header">
            <figure class="publisher flex-item">
                <img src=${this.user.userPic}>  
                <figcaption class="publisher-info"> 
                    <span class="publisher-name color-blue">${this.user.fullName}</span>
                    <div class="post-info">
                        <span class="post-date">${this.date.getHours()}:${this.date.getMinutes()} </span>
                        <span class="post-type-icon"><i class="fas fa-user-friends"></i></span>
                    </div>
                </figcaption>
            </figure>
            <div class="post-options">
                <i class="fas fa-ellipsis-h"></i>
                <div class="post-options-menu">
                    <div class="bg"></div>
                    <div class="edit-post">
                        <span> Edit Post </span>
                        <div class="edit-post-area" >
                            <textarea type="text" value=""></textarea>
                            <button class="save-btn btn">Save</button>
                        </div>
                    </div>
                    <div class="remove-post">
                        <span> Remove Post </span>
                    </div>
                </div>
            </div>
        </div>
        <p class="post-text light-padded ${this.lang}">
            ${this.message}
        </p>
        <div class="post-user-action">
            <button class="like white-btn btn">
                <i class="far fa-thumbs-up"></i>
                <span> Like </span>
            </button>
            <button class="white-btn btn">
                <i class="far fa-comment"></i>
                <span> Comment </span>
            </button>
            <button class="white-btn btn" style="display: none;">  <!--change this!!!-->
                <i class="far fa-share-square"></i>
                <span> Share </span>
            </button>
        </div>
    </div>
        <div class="post-likes">
            <img src="img/like.png" alt="">
            <span class="likes-num"></span>
        </div>
        <div class="post-comments">
            <div class="personal-comment">
                <img src="img/userpic.jpg" alt="userpic">
                <div class="personal-comment-input-and-icons">
                    <input type="text" placeholder="Write a Comment...">
                    <i class="far fa-smile"></i>
                    <i class="fas fa-camera"></i>
                </div>
            </div>
        </div>`;
    this.removebtn = this.div.querySelector('.remove-post');
    this.removebtn.addEventListener('click', () => this.removePost());
    // this.removebtn = createElement(this.div, '.remove-post', 'click', this.removePost());
    this.editBtn = this.div.querySelector('.edit-post');
    this.editBtn.addEventListener('click', () => this.editPost());
    this.textarea = this.div.querySelector('.edit-post-area textarea');
    this.textarea.innerText = this.message;
    this.postBody = this.div.querySelector('.post-text');
    this.postOptions = this.div.querySelector('.post-options-menu');
    this.postOptions.addEventListener('mouseleave', () => this.postOptions.style.display = 'none')
    this.showPostOptions = this.div.querySelector('.fa-ellipsis-h');
    this.showPostOptions.addEventListener('click', () => this.postOptions.style.display = 'flex');
    this.likeBtn = this.div.querySelector('.post-user-action .like');
    this.likeBtn.addEventListener('click', () => this.reactionsCounter());
    this.likesNum = this.div.querySelector('.likes-num');
    this.likes = this.div.querySelector('.post-likes');
    if (likes > 0) {
        this.likes.style.display = 'flex';
        
    }
    this.likes = likes;
    this.likesNum.innerText = this.likes;
}
    removePost() {
        this.div.parentNode.removeChild(this.div);
    }
    editPost() {
        this.textarea.parentNode.style.display = 'block';
        this.saveBtn = this.div.querySelector('.edit-post-area .save-btn');
        this.saveBtn.addEventListener('click', () =>{
            this.postBody.innerText = this.textarea.value;
        });
    }
    reactionsCounter() {
        this.likes++;
        this.likesNum = this.div.querySelector('.likes-num');
        this.likesNum.innerText = this.likes;
    }
}  
new Feed(document.querySelector('.newsfeed'));

let body = document.querySelector('body');
let extendedInput = document.querySelector('.extend-user-input');
// let userInput = document.querySelector('.user-input');
// let bg = document.querySelector('.bg');
body.addEventListener('click',(event) => {
    // log(event);
    if (event.target.className === 'user-input-textarea') {
        extendedInput.style.display = 'block';
        // bg.style.backgroundColor = 'rgba(0,0,0,0.2)';
        // bg.style.zIndex = '11';
        // userInput.style.zIndex = '158';
    }
});
body.addEventListener('click',(event) => {
    // log(event);
    if (event.target.className !== 'user-input-textarea') {
        extendedInput.style.display = 'none';
    }
});
