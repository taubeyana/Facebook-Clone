class PostComments {
    constructor(parent,user) {
        this.parent = parent;
        this.user = user;
        this.div = $('<div></div>')
        .html(`
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
        </div>`)
        .appendTo(this.parent);
        this.userCommentInput = $('.user-comment-input', this.div).on('keypress', (event) => this.addComment(event));
        
    }
    addComment(event) {
        if (event.keyCode === 13) {
            this.commentsArea = query(this.div, '.post-comments-area');
            this.userComment = document.createElement('DIV');
            this.userComment.setAttribute('class', 'comment');
            this.userComment.innerHTML = `
            <div class="user-info">
                <img src="img/userpic.jpg" alt="userpic">
            </div>
            <div class="user-comment">
                <span class="color-blue">${this.user.fullName}</span>
                <p class="user-comment-text">${this.userCommentInput.value}</p>
                <div class="comment-reactions">
                    <span class="like color-blue">Like</span>
                    <span class="color-blue">Reply</span>
                </div>
            </div>
            `
            this.userComment2 = query(this.userComment, '.user-comment');
            this.commentsArea.appendChild(this.userComment);
            this.con = new CommentLikes(this.userComment2);
            this.userCommentInput.value = '';
        }
    }
}