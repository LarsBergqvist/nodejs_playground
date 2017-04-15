const Review = require('./review.js');


module.exports = class ReviewsRepository
{
    constructor() {
        this.db = {}
        this.nextId=1;

        this.createNewReview({title:"A new hope", content:"Great film!",author:"Arne",rating:4});
        this.createNewReview({title:"The Empire Strikes Back", content:"Even better than IV",author:"Bertil",rating:5});
        this.createNewReview({title:"Return of the Jedi", content:"Not too bad",author:"Ann",rating:4});
        this.createNewReview({title:"Attack of the clones", content:"Getting better",author:"Arne",rating:4});
        this.createNewReview({title:"Revenge of the Sith", content:"ok...",author:"Sofie",rating:4});        
    }

    getReview(id) {
        return this.db[id];
    }

    getAllReviews() {
        let dict = this.db;
        const values = Object.keys(this.db).map(function(key){
            return dict[key];
        });
        
        return values;        
    }

    updateReview(id,input) {
        let review = this.getReview(id);
        review.title = input.title || review.title;
        review.rating = input.rating || review.rating;
        review.content = input.content || review.content;
        review.author = input.author || review.author;
        this.db[id] = review;
        return review;
    }
    
    createNewReview({title, content, author, rating}) {
        let id = this.nextId++;
        let review = new Review(id,{title:title,content:content,author:author,rating:rating});
        this.db[id] = review;
        return review;
    }
}