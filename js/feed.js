import $ from 'jquery';
import {Post} from '../js/post';
import {UsersService, PostsService,CommentsService} from '../js/services';

export class Feed {
    constructor(mainEl,userid) {
        this.mainEl = mainEl;
        this.fetchUser(userid);
    }
    
    fetchUser(userid) {
        UsersService.getUser(userid)
        .then(user => {
            this.onUser(user)
        });
        
    }
    onUser(user) {
        this.user = user;
        this.userPosts = this.fetchPosts(this.user);
        this.serverPosts = this.fetchServerPosts();
        this.render();
        
    }
    render() {
        this.postbtn = $('.postbtn',this.mainEl);
        this.input = $('.user-input textarea',this.mainEl);
        this.input.attr('placeholder', `What's on your mind, ${this.user.fullName}`);
        this.postsArea = $('.posts-area',this.mainEl);
        this.postbtn.on('click',() => this.createPost());
    }
    
    fetchPosts(user) {
        PostsService.getUserPosts(user.id)
        .then(posts => {
            posts.forEach(element => {
                let post = new Post(this.user,element.body);
                this.postsArea.prepend(post.div);
            });
        });
    }
    fetchPostComments(postID) {
        CommentsService.getComments(postID)
        .then(comments => log(comments));
    } 
    
    fetchServerPosts() {
        PostsService.getServerPosts()
        .then(posts => {
            posts.forEach(element => {
                let post = new Post(this.user, element.message);
                this.postsArea.prepend(post.div);
            });
        });
    }
    createPost() {
        let userInput = this.input.val();
        this.input.val('');
        let post = new Post(this.user, userInput);
        this.postsArea.prepend(post.div);
    }
}
