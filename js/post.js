// Helpers for short selections and debug

const {log} = console;
const $ = function(mainEl,selector) {
    return mainEl.querySelector(selector);
}
const $$ = function(mainEl,selector) {
    return mainEl.querySelectorAll(selector);
}


class UsersService {
    getUser(id) {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        // return fetch('http://127.0.0.1:3000')
        .then(res => res.json())
        // .then(user => log(user))
        .then(user => new User(user));
    }
}

class PostsService {
    getUserPosts(user) {
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user}`)
        .then(res => res.json())
        .then(posts => posts);
    }
}

// class PostsService {
//     getPosts() {
//         fetch('http://127.0.0.1:3000').then(data => {
//             data.json().then(myjson => {
//                 let posts = myjson.posts;
//                 let feed = document.querySelector('.posts-area');
//                 posts.forEach(post => {
//                     let user =  new User(post.user.firstName, post.user.lastName,post.user.image);
//                     let newpost = new DynamicPost(user,post.message,post.likes, post.lang);
//                     feed.insertBefore(newpost.div, feed.firstChild);
//                 });
//                 localStorage.setItem('posts', JSON.stringify(myjson));
//             });
//         }).catch(() => {
//                 log('Offline mode');
//                 let feed = document.querySelector('.posts-area');
//                 let offlinePosts = JSON.parse(localStorage.getItem('posts'));
//                 offlinePosts.posts.forEach(post => {
//                     let user =  new User(post.user.firstName, post.user.lastName,post.user.image);
//                     let newpost = new DynamicPost(user,post.message,post.likes, post.lang);
//                     feed.insertBefore(newpost.div, feed.firstChild);
//             }); 
//         });
//     }
// }

let usersService = new UsersService();
let postsService = new PostsService();

class User {
    constructor(userObj) {
        this.fullName = userObj.name;
        this.id = userObj.id;
        // console.log(this)
    }
}

class Feed {
    constructor(mainEl,userid) {
        this.mainEl = mainEl;
        this.fetchUser(userid);
    }
    
    fetchUser(userid) {
        usersService.getUser(userid)
        .then(user => {
            this.onUser(user)
        });
        
    }
    onUser(user) {
        this.user = user;
        this.userPosts = this.fetchPosts(this.user);
        this.render();
        
    }
    render() {
        this.postbtn = $(this.mainEl,'.postbtn');
        this.input = $(this.mainEl, '.user-input textarea');
        this.input.setAttribute('placeholder', `What's on your mind, ${this.user.fullName}`);
        this.postsArea = $(this.mainEl, '.posts-area');
        this.postbtn.addEventListener('click',() => this.createPost());
    }

    fetchPosts(user) {
        postsService.getUserPosts(user.id)
        .then(posts => {
            posts.forEach(element => {
                log(element);
            });
        })
    }
    createPost() {
        let userInput = this.input.value;
        this.input.value =  '';
        let post = new Post(this.user, userInput);
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
        this.div.innerHTML = `
        <div class="post template">
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
        </div>`;
    this.header = $(this.div,'.post-header');
    this.options = new PostOptions(this.div);
    this.header.appendChild(this.options.div);
    this.postLikes = new PostLikes(this.div); 
    this.postComments = new PostComments(this.div,this.user);  
    }
}  

class PostLikes {
    constructor(parent) {
        this.parent = parent;
        this.div = document.createElement('DIV');
        this.div.innerHTML = `
        <div class="post-likes">
            <img src="img/like.png" alt="">
            <span class="likes-num"></span>
        </div>`
        this.parent.appendChild(this.div);
        this.likes = 0;
        this.likeBtn = $(this.parent,'.post-user-action .like');
        this.likeBtn.addEventListener('click', () => this.reactionsCounter());
    }
    reactionsCounter() {
        this.reactions = $(this.div,'.post-likes');
        this.reactions.style.display = 'flex';
        this.likes++;
        this.likesNum = $(this.div,'.likes-num');
        this.likesNum.innerText = this.likes;
    }
}

class PostOptions{
    constructor(parent) {
        this.parent = parent;
        this.div = document.createElement('DIV');
        this.div.innerHTML = `
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
        </div>`;
        this.optionsMenu = $(this.div,'.post-options-menu');
        this.showPostOptions = this.div.querySelector('.fa-ellipsis-h');
        this.removeBtn = $(this.div,'.remove-post');
        this.editBtn = $(this.div,'.edit-post');
        this.saveBtn = $(this.div,'.edit-post-area .save-btn');
        this.listeners();
    }

    listeners() {
        this.removeBtn.addEventListener('click', () => this.removePost());
        this.editBtn.addEventListener('click', () => this.editPost());
        this.optionsMenu.addEventListener('mouseleave', () => this.optionsMenu.style.display = 'none');
        this.showPostOptions.addEventListener('click', () => this.optionsMenu.style.display = 'flex');
    }
    editPost() {
        this.textarea = $(this.div,'.edit-post-area textarea');
        this.postText = $(this.parent,'.post-text');
        this.textarea.innerText =  this.postText.innerText;
        this.textarea.parentNode.style.display = 'block';
        this.saveBtn.addEventListener('click', () =>{
            this.postText.innerText = this.textarea.value;
            this.optionsMenu.style.display = 'none';
        });
    }
    removePost() {
        this.parent.parentNode.removeChild(this.parent);
    }
}

class PostComments {
    constructor(parent,user) {
        this.parent = parent;
        this.user = user;
        this.div = document.createElement('DIV');
        this.div.innerHTML = `
        <div class="post-comments">
            <div class="post-comments-area">
                
            </div>  
            <div class="personal-comment">
                <img src="img/userpic.jpg" alt="userpic">
                <div class="personal-comment-input-and-icons">
                    <input type="text" placeholder="Write a Comment..." class="user-comment-input">
                    <i class="far fa-smile"></i>
                    <i class="fas fa-camera"></i>
                </div>
            </div>
        </div>`
        this.parent.appendChild(this.div);
        this.userCommentInput = $(this.div, '.user-comment-input');
        this.userCommentInput.addEventListener('keypress', (event) => this.addComment(event));
    }
    addComment(event) {
        if (event.keyCode === 13) {
            this.commentsArea = $(this.div, '.post-comments-area');
            this.userComment = document.createElement('DIV');
            this.userComment.innerHTML = `
            <div class="comment">
                <div class="user-info">
                    <img src="${this.user.userPic}" alt="userpic">
                    <div class="user-comment">
                        <span class="color-blue">${this.user.fullName}</span> 
                        <p class="user-comment-text">${this.userCommentInput.value}</p>
                    </div>
                </div>
            </div> `
            this.commentsArea.appendChild(this.userComment);
            this.userCommentInput.value = '';
        }
    }
}

new Feed(document.querySelector('.newsfeed'),3);

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
