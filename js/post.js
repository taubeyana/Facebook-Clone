import $ from 'jquery';
import {PostOptions} from '../js/postOptions';
import {PostLikes} from '../js/postLikes';
import {PostComments}  from '../js/postComments';

export class Post {
    constructor(user, userInput, lang = '') {
        this.user = user;
        this.userInput = userInput;
        this.lang = lang;
        this.date = new Date;
        this.div = $('<div></div>')
        .html(`
        <div class="post template">
        <div class="post-header">
        <figure class="publisher flex-item">
        <img src="./img/puppy.jpg">  
        <figcaption class="publisher-info"> 
        <span class="publisher-name color-blue">${this.user.fullName}</span>
        <div class="post-info">
        <span class="post-date">${this.date.getHours()}:${this.date.getMinutes()} </span>
        <span class="post-type-icon"><i class="fas fa-user-friends"></i></span>
        </div>
        </figcaption>
        </figure>
        </div>
        <p class="post-text light-padded ${this.lang}" spellcheck="false">${this.userInput}</p> 
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
        </div>`);
        this.header = $('.post-header',this.div);
        this.options = new PostOptions(this.div);
        this.header.append(this.options.div);
        this.postLikes = new PostLikes(this.div);
        this.postComments = new PostComments(this.div,this.user);
    }
}