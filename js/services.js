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

class PostsService {
    static getUserPosts(user) {
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user}`)
        .then(res => res.json())
        .then(posts => posts);
        
    }
    static getServerPosts() {
        return fetch('http://127.0.0.1:3000')
        .then(data => data.json())
        .then(myjson => {
            localStorage.setItem('posts', JSON.stringify(myjson));
            return myjson.posts;
        })
        .catch(() => {
                log('Offline mode');
                return JSON.parse(localStorage.getItem('posts')).posts;
        });
    }
}

// class CommentsService {
//     static getComments(userId) {
//         return fetch()
//     }
// }
