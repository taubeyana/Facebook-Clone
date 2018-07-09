class Likes {
    constructor(parent) {
        this.parent = parent;
        this.likeBtn = $('.like',this.parent).click(() => this.displayLikes());
        this.div = $('<div></div>');
        this.likes = 0;

    }
    displayLikes() {
        this.reactions = $('.likes',this.div)
        .css('display','flex');
        this.reactionsCounter();
    }

    reactionsCounter() {
        this.likes++;
        this.likesNum = $('.likes-num',this.div)
        .text(this.likes);
    }
}

class PostLikes extends Likes {
    constructor(parent) {
        super(parent);
        this.div.html(`
        <div class="post-likes likes">
            <img src="img/like.png" alt="">
            <span class="likes-num"></span>
        </div>`)
        .appendTo(this.parent);
    }
}

class CommentLikes extends Likes {
    constructor(parent) {
        super(parent);
        this.div.attr('class', 'comment-likes likes');
        this.div.html(`
        <div class="likes">
            <img src="img/like.png" alt="">     
            <span class="likes-num"></span>
        </div>`)
        .appendTo(this.parent);
    }
    displayLikes() {
        this.div.css('display','flex');
        this.reactionsCounter();
    }
    
}