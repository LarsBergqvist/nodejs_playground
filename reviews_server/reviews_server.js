const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

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
    getReviewIDs : [String]
    getAllReviews : [Review]
  }

  type Mutation {
    createReview(input: ReviewInput): Review
    updateReview(id: ID!, input: ReviewInput): Review
  }
`);

class Review {
  constructor(id, {title, content, author, rating}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.rating = rating
  }
}

const fakeDatabase = {};

const getNewId = function() {
    return(require('crypto').randomBytes(10).toString('hex'));
}

const generateInitialData = function() {
    fakeDatabase[getNewId()] = new Review(getNewId(),{title:"A new hope", content:"Great film!",author:"Arne",rating:4});
    fakeDatabase[getNewId()] = new Review(getNewId(),{title:"The Empire Strikes Back", content:"Even better than IV",author:"Bertil",rating:5});
    fakeDatabase[getNewId()] = new Review(getNewId(),{title:"Return of the Jedi", content:"Not too bad",author:"Ann",rating:4});
    fakeDatabase[getNewId()] = new Review(getNewId(),{title:"Attack of the clones", content:"Getting better",author:"Arne",rating:4});
    fakeDatabase[getNewId()] = new Review(getNewId(),{title:"Revenge of the Sith", content:"ok...",author:"Sofie",rating:4});
}

const root = {
  getReviewIDs: function() {
      return  Object.keys(fakeDatabase);
  },
  getAllReviews: function() {
    const values = Object.keys(fakeDatabase).map(function(key){
        return new Review(key,fakeDatabase[key]);
    });
    return values;
  },
  getReview: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no Review exists with id ' + id);
    }
    return new Review(id, fakeDatabase[id]);
  },
  createReview: function ({input}) {
    const id = getNewId();

    fakeDatabase[id] = input;
    return new Review(id, input);
  },
  updateReview: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no Review exists with id ' + id);
    }
    let review = fakeDatabase[id];
    review.title = input.title || review.title;
    review.rating = input.rating || review.rating;
    review.content = input.content || review.content;
    review.author = input.author || review.author;
    fakeDatabase[id] = review;
    return review;
  },
}

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
generateInitialData();
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
