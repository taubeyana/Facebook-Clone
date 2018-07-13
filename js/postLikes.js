let Likes = require('../js/likes');

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

module.exports = PostLikes;