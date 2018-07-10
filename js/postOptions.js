class PostOptions{
    constructor(parent) {
        this.parent = parent;
        this.div = $('<div></div>')
        .html(`
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
        </div>`);
        this.optionsMenu = $('.post-options-menu',this.div);
        this.showPostOptions = $('.fa-ellipsis-h',this.div);
        this.removeBtn = $('.remove-post',this.div);
        this.editBtn = $('.edit-post',this.div);
        this.saveBtn = $('.edit-post-area .save-btn', this.div);
        this.listeners();
    }

    listeners() {
        this.removeBtn.click(() => this.removePost());
        this.editBtn.click(() => this.editPost());
        this.optionsMenu.on('mouseleave', () => this.optionsMenu.hide());
        this.showPostOptions.on('click', () => this.optionsMenu.show());
    }
    editPost() {
        this.textarea = $('.edit-post-area textarea',this.div);
        this.postText = $('.post-text',this.parent);
        this.textarea.text(this.postText.text());
        this.textarea.parent().show();
        this.saveBtn.on('click', () =>{
            this.postText.text(this.textarea.val());
            this.optionsMenu.hide();
        });
    }
    removePost() {
        this.parent.remove();
    }
}