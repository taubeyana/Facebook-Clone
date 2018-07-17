import {Options} from '../js/options';

export class CommentsOptions extends Options {
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