import {Likes} from '../js/likes';

export class CommentLikes extends Likes {
    constructor(parent) {
        super(parent);
        this.div.attr('class', 'comment-likes likes');
        this.div.html(`
        <div class="likes">
        <img src="../img/like.png" alt="">     
        <span class="likes-num"></span>
        </div>`)
        .appendTo(this.parent);
    }
    displayLikes() {
        this.div.show();
        this.reactionsCounter();
    }
}