class Likes {
    constructor(parent) {
        this.parent = parent;
        this.likeBtn = $('.like',this.parent).click(() => this.displayLikes());
        this.div = $('<div></div>');
        this.likes = 0;
        
    }
    displayLikes() {
        this.reactions = $('.likes',this.div).slideDown();
        this.reactionsCounter();
    }
    
    reactionsCounter() {
        this.likes++;
        this.likesNum = $('.likes-num',this.div)
        .text(this.likes);
    }
}
module.exports = Likes;