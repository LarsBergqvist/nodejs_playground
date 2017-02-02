const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const ReviewsRepository = require('./reviewsrepository.js');
const Review = require('./review.js');
const repo = new ReviewsRepository();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input ReviewInput {
    title: String
    content: String
    author: String
    rating: Int
  }

  type Review {
    id: ID!
    title: String
    content: String
    author: String
    rating : Int
  }

  type Query {
    getReview(id: ID!): Review
    getAllReviews : [Review]
  }

  type Mutation {
    createReview(input: ReviewInput): Review
    updateReview(id: ID!, input: ReviewInput): Review
  }
`);

const root = {
  getAllReviews: function() {
    return repo.getAllReviews();
  },
  getReview: function ({id}) {
    return repo.getReview(id);
  },
  createReview: function ({input}) {
    return repo.createNewReview(input);
  },
  updateReview: function ({id, input}) {
    let review = repo.getReview(id);    
    if (!review) {
      throw new Error('no Review exists with id ' + id);
    }

    review = repo.updateReview(id,input)
    return review;
  },
}

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
