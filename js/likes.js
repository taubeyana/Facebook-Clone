class Likes {
    constructor(parent) {
        this.parent = parent;
        this.likeBtn = $(this.parent,'.like');
        this.div = document.createElement('DIV');
        this.likes = 0;
        this.likeBtn.addEventListener('click', () => this.displayLikes());

    }
    displayLikes() {
        this.reactions = $(this.div,'.likes');
        this.reactions.style.display = 'flex';
        this.reactionsCounter();
    }

    reactionsCounter() {
        this.likes++;
        this.likesNum = $(this.div,'.likes-num');
        this.likesNum.innerText = this.likes;
    }
}

class PostLikes extends Likes {
    constructor(parent) {
        super(parent);
        this.div.innerHTML = `
        <div class="post-likes likes">
            <img src="img/like.png" alt="">
            <span class="likes-num"></span>
        </div>`
        this.parent.appendChild(this.div);
    }
}

class CommentLikes extends Likes {
    constructor(parent) {
        super(parent);
        this.div.setAttribute('class', 'comment-likes likes');
        this.div.innerHTML = `
        <div class="likes">
            <img src="img/like.png" alt="">     
            <span class="likes-num"></span>
        </div>`
        this.parent.appendChild(this.div);
    }
    displayLikes() {
        this.div.style.display = 'block';
        this.reactionsCounter();
    }
    
}