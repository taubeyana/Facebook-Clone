import {Likes} from '../js/likes';

export class PostLikes extends Likes {
    constructor(parent) {
        super(parent);
        this.div.html(`
        <div class="post-likes likes">
        <img src="./img/like.png" alt="">
        <span class="likes-num"></span>
        </div>`)
        .appendTo(this.parent);
    }
}
