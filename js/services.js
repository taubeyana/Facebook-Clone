// Helpers for short selections and debug

const {log} = console;
const query = function(mainEl,selector) {
    return mainEl.querySelector(selector);
}
const queryAll = function(mainEl,selector) {
    return mainEl.querySelectorAll(selector);
}

// Fetching users by id from jsonplaceholder server

class UsersService {
    static getUser(id) {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.json())
        .then(user => new User(user));
    }
}

// Fetching posts from server


// class PostsService {
//     static getUserPosts(user) {
//         return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user}`)
//         .then(res => res.json())
//         .then(posts => posts);
//     }
//     static getServerPosts() {
//         return fetch('http://127.0.0.1:3000').then(data => {
//             data.json().then(myjson => {
//                 let posts = myjson.posts;
//                 let feed = document.querySelector('.posts-area');
//                 posts.forEach(post => {
//                     let user =  new User(post.user);
//                     let newpost = new Post(user,post.message,post.likes, post.lang);
//                     feed.insertBefore(newpost.div, feed.firstChild);
//                 });
//                 localStorage.setItem('posts', JSON.stringify(myjson));
//             });
//         }).catch(() => {
//                 log('Offline mode');
//                 let feed = document.querySelector('.posts-area');
//                 let offlinePosts = JSON.parse(localStorage.getItem('posts'));
//                 offlinePosts.posts.forEach(post => {
//                     let user =  new User(post.user);
//                     let newpost = new Post(user,post.message,post.likes, post.lang);
//                     feed.insertBefore(newpost.div, feed.firstChild);
//             }); 
//         });
//     }
// }

class PostsService {
    static getUserPosts(user) {
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user}`)
        .then(res => res.json())
        .then(posts => posts);
    }
    static getServerPosts() {
        return fetch('http://127.0.0.1:3000')
        .then(data => data.json())
        .then(myjson => myjson.posts)
        .catch(() => {
                log('Offline mode');
                let feed = document.querySelector('.posts-area');
                let offlinePosts = JSON.parse(localStorage.getItem('posts'));
                offlinePosts.posts.forEach(post => {
                    let user =  new User(post.user);
                    let newpost = new Post(user,post.message,post.likes, post.lang);
                    feed.insertBefore(newpost.div, feed.firstChild);
            }); 
        });
    }
}

// class CommentsService {
//     static getComments(userId) {
//         return fetch()
//     }
// }
