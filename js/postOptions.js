class Options {
    constructor(parent) {
        this.parent = parent;
        this.div = $('<div></div>')
        .click(() => this.optionsMenu.css('display','flex'));
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
                <span class="edit-post edit"> Edit Post </span>
                <span class="remove-post remove"> Remove Post </span>
            </div>`);
        this.render();
        this.editBtn = $('.edit-post',this.div)
        .click(() => this.editPost());
        this.postText = $('.post-text',this.parent)
        .on('blur', () =>this.postText.attr('contenteditable',"false")) ;
    }
    editPost() {
        this.postText.attr('contenteditable',"true").focus();
        this.optionsMenu.hide();
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