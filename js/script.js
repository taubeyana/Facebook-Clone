let {log} = console;

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
        this.input.value = '';
        let post = new Post(this.user, userInput);
        this.postsArea.insertBefore(post.div, this.postsArea.firstChild);
    }
}
class Post {
    constructor(user, userInput) {
        this.user = user;
        this.userInput = userInput;
        this.date = new Date;
        this.div = document.createElement('DIV');
        this.div.innerHTML = `<div class="private-post template">
        <div class="post-header">
            <figure class="publisher flex-item">
                <img src=${this.user.userPic}>
                <figcaption class="publisher-info"> 
                    <span class="color-blue publisher-name">${this.user.fullName}</span>
                    <span class="post-date">${this.date.getHours()}:${this.date.getMinutes()} <span class="post-type-icon"><i class="fas fa-user-friends"></span></i> </span>
                </figcaption>
            </figure>
            <div class="post-options">
                <i class="fas fa-ellipsis-h"></i>
                <div class="post-options-menu">
                    <div class="bg"></div>
                    <div class="edit-post">
                        <span> Edit Post </span>
                        <div class="edit-post-area" >
                            <textarea type="text" value="dgfdfg"></textarea>
                            <button>Save</button>
                        </div>
                    </div>
                    <div class="remove-post">
                        <span> Remove Post </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="post-body1">
            <p class="post-title light-padded heb">
            ${this.userInput}
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
    this.removebtn = this.div.querySelector('.remove-post');
    this.removebtn.addEventListener('click', () => this.removePost());
    this.editBtn = this.div.querySelector('.edit-post');
    this.editBtn.addEventListener('click', () => this.editPost());
    this.textarea = this.div.querySelector('.edit-post-area textarea');
    this.textarea.innerText = this.userInput;
    this.postBody = this.div.querySelector('.post-body1 .post-title');
    this.postOptions = this.div.querySelector('.post-options-menu');
    this.postOptions.addEventListener('mouseleave', () => this.postOptions.style.display = 'none')
    this.showPostOptions = this.div.querySelector('.fa-ellipsis-h');
    this.showPostOptions.addEventListener('click', () => this.postOptions.style.display = 'flex');
    }
    removePost() {
        this.div.parentNode.removeChild(this.div);
    }
    editPost() {
        this.textarea.parentNode.style.display = 'block';
        this.saveBtn = this.div.querySelector('.edit-post-area button');
        this.saveBtn.addEventListener('click', () =>{
            this.postBody.innerText = this.textarea.value;
        });
    }
}  

new Feed(document.querySelector('.newsfeed'));