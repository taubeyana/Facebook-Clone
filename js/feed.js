class Feed {
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
        this.render();
        
    }
    render() {
        this.postbtn = $(this.mainEl,'.postbtn');
        this.input = $(this.mainEl, '.user-input textarea');
        this.input.setAttribute('placeholder', `What's on your mind, ${this.user.fullName}`);
        this.postsArea = $(this.mainEl, '.posts-area');
        this.postbtn.addEventListener('click',() => this.createPost());
    }

    fetchPosts(user) {
        PostsService.getUserPosts(user.id)
        .then(posts => {
            posts.forEach(element => {
                let el = new DynamicPost(this.user.fullName, element.body);
                log(el)
            });
        })
    }
    createPost() {
        let userInput = this.input.value;
        this.input.value =  '';
        let post = new Post(this.user, userInput);
        this.postsArea.insertBefore(post.div, this.postsArea.firstChild);
    }
}