class DynamicPost {
    constructor(user, body, lang = '') {
        this.user = user;
        this.body = body;
        this.lang = lang;
        this.date = new Date;
        this.div = document.createElement('DIV');
        this.div.innerHTML = `
        <div class="post template">
            <div class="post-header">
                <figure class="publisher flex-item">
                    <img src="img/puppy.jpg">  
                    <figcaption class="publisher-info"> 
                        <span class="publisher-name color-blue">${this.user.fullName}</span>
                        <div class="post-info">
                            <span class="post-date">${this.date.getHours()}:${this.date.getMinutes()} </span>
                            <span class="post-type-icon"><i class="fas fa-user-friends"></i></span>
                        </div>
                    </figcaption>
                </figure>
            </div>
            <p class="post-text light-padded ${this.lang}">
                ${this.body}
            </p>    
            <div class="post-user-action">
                <button class="like white-btn btn">
                    <i class="far fa-thumbs-up"></i>
                    <span> Like </span>
                </button>
                <button class="white-btn btn">
                    <i class="far fa-comment"></i>
                    <span> Comment </span>
                </button>
                <button class="white-btn btn" style="display: none;">  <!--change this!!!-->
                    <i class="far fa-share-square"></i>
                    <span> Share </span>
                </button>
            </div>
        </div>`;
    this.header = query(this.div,'.post-header');
    this.options = new PostOptions(this.div);
    this.header.appendChild(this.options.div);
    this.postLikes = new PostLikes(this.div); 
    this.postComments = new PostComments(this.div,this.user);  
    }
}  