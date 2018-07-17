import $ from 'jquery';
import {CommentsOptions} from '../js/commentsOptions';
import {CommentLikes} from '../js/commentLikes';

export class PostComments {
    constructor(parent,user) {
        this.parent = parent;
        this.user = user;
        this.div = $('<div></div>')
        .html(`
        <div class="post-comments">
        <div class="post-comments-area">
        </div>  
        <div class="personal-comment">
        <img src="../img/userpic.jpg" alt="userpic">
        <div class="personal-comment-input-and-icons">
        <input type="text" placeholder="Write a Comment..." class="user-comment-input">
        <i class="far fa-smile"></i>
        <i class="fas fa-camera"></i>
        </div>
        </div>
        </div>`)
        .appendTo(this.parent);
        this.userCommentInput = $('.user-comment-input', this.div)
        .on('keypress', (event) => this.addComment(event));
        
    }
    addComment(event) {
        if (event.keyCode === 13) {
            this.commentsArea = $('.post-comments-area',this.div);
            this.comment = $('<div></div>')
            .attr('class', 'comment')
            .html(`
            <div class="user-info">
            <img src="../img/userpic.jpg" alt="userpic">
            </div>
            <div class="user-comment">
            <span class="color-blue">${this.user.fullName}</span>
            <p class="user-comment-text">${this.userCommentInput.val()}</p>
            <div class="comment-reactions">
            <span class="like color-blue">Like</span>
            <span class="color-blue">Reply</span>
            </div>
            </div>
            `)
            .appendTo(this.commentsArea);
            this.userComment = $('.user-comment',this.comment);
            new CommentLikes(this.userComment);
            new CommentsOptions(this.userComment);
            this.userCommentInput.val('');
        }
    }
}