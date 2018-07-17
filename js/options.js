const $ = require('jquery');

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
module.exports = Options;