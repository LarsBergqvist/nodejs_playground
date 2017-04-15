module.exports = class Review {
  constructor(id, {title, content, author, rating}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.rating = rating
  }
}