class Options {
    constructor(parent) {
        this.parent = parent;
        this.div = $('<div></div>')
        .click(() => this.optionsMenu.show());
    }
    render() {
        this.removeBtn = $('.remove',this.div)
        .click(() => this.removePost());
        this.optionsMenu = $('.options-menu',this.div)
        .on('mouseleave', () => this.optionsMenu.hide());
    }
    removePost() {
        if (this.parent[0].className === "user-comment") {
            this.parent.parent().remove();
        }
        else {
            this.parent.remove();
        }
    }
}

class PostOptions extends Options {
    constructor(parent) {
        super(parent);
        this.div
        .attr('class', 'post-options options')
        .html(`
            <i class="fas fa-ellipsis-h"></i>
            <div class="post-options-menu options-menu">
                <div class="bg"></div>
                <div class="edit-post edit">
                    <span> Edit Post </span>
                    <div class="edit-post-area" >
                        <textarea type="text" value=""></textarea>
                        <button class="save-btn btn">Save</button>
                    </div>
                </div>
                <div class="remove-post remove">
                    <span> Remove Post </span>
                </div>
            </div>
        </div>`);
        this.render();
        this.editBtn = $('.edit-post',this.div);
        this.saveBtn = $('.edit-post-area .save-btn', this.div);
        this.editBtn.click(() => this.editPost());
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
}

class CommentsOptions extends Options {
    constructor(parent) {
        super(parent);
        this.div
        .attr('class', 'comment-options options')
        .html(`
        <i class="fas fa-ellipsis-h"></i>
        <div class="comment-options-menu options-menu">
            <span class="remove-comment remove"> Remove </span>
        </div>`)
        .appendTo(this.parent);
        this.render();
    }
}