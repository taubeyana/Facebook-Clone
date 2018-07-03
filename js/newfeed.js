class UsersService {
    getUser(id) {
        return fetch('https://jsonplaceholder.typicode.com/users/'+id)
        .then(res => res.json())
        .then(user => new User(user)); 
    }
}
class PostsService {
    getPost(userId) {
        return fetch('https://jsonplaceholder.typicode.com/posts/?userId='+ userId)
        .then(res => res.json())
        .then(post => console.log(post));
    }
}
class User {
    constructor(userObj) {
        this.fullName = userObj.name;
        this.id = userObj.id;
    }
}

class PostBody {
    constructor(user, userInput, lang='') {
        this.user = user.name;
        this.userInput = userInput;
        this.lang = lang;
        this.date = new Date;
        this.div = document.createElement('DIV');
        this.div.innerHTML = 
        `<div class="post template">
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
        </p>`
    }
    editPost()
}

let userservice = new UsersService();
let postsservice = new PostsService();
// let newuser = userservice.getUser(3); 
// console.log(postsservice.getPost(3))
// console.log(newuser);
