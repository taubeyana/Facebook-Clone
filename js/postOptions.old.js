class Options {
    constructor(parent) {
        this.parent = parent;
    }
    removePost() {
        // this.parent.parentNode.removeChild(this.parent);
        this.parent.remove();
    }
}
class PostOptions extends Options{
    constructor(parent) {
        // this.parent = parent;
        super(parent);
        this.div = document.createElement('DIV');
        this.div.innerHTML = `
        <div class="post-options">
            <i class="fas fa-ellipsis-h"></i>
            <div class="post-options-menu">
                <div class="bg"></div>
                <div class="edit-post">
                    <span> Edit Post </span>
                    <div class="edit-post-area" >
                        <textarea type="text" value=""></textarea>
                        <button class="save-btn btn">Save</button>
                    </div>
                </div>
                <div class="remove-post">
                    <span> Remove Post </span>
                </div>
            </div>
        </div>`;
        this.optionsMenu = query(this.div,'.post-options-menu');
        this.showPostOptions = this.div.querySelector('.fa-ellipsis-h');
        this.removeBtn = query(this.div,'.remove-post');
        this.editBtn = query(this.div,'.edit-post');
        this.saveBtn = query(this.div,'.edit-post-area .save-btn');
        this.listeners();
    }

    listeners() {
        this.removeBtn.addEventListener('click', () => this.removePost());
        this.editBtn.addEventListener('click', () => this.editPost());
        this.optionsMenu.addEventListener('mouseleave', () => this.optionsMenu.style.display = 'none');
        this.showPostOptions.addEventListener('click', () => this.optionsMenu.style.display = 'flex');
    }
    editPost() {
        this.textarea = query(this.div,'.edit-post-area textarea');
        this.postText = query(this.parent,'.post-text');
        this.textarea.innerText =  this.postText.innerText;
        this.textarea.parentNode.style.display = 'block';
        this.saveBtn.addEventListener('click', () =>{
            this.postText.innerText = this.textarea.value;
            this.optionsMenu.style.display = 'none';
        });
    }

}