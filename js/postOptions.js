import {Options} from '../js/options';
import $ from 'jquery';

export class PostOptions extends Options {
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
