// Helpers for short selections and debug

const {log} = console;
const $ = function(mainEl,selector) {
    return mainEl.querySelector(selector);
}
const $$ = function(mainEl,selector) {
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

// Fetching user posts by user id from jsonplaceholder server

class PostsService {
    static getUserPosts(user) {
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user}`)
        .then(res => res.json())
        .then(posts => posts);
    }
}
