const express = require('express');

// Import GraphQL middleware
const expressGraphQL = require('express-graphql');

// Import Mongo Db Client API
const mongoose = require('mongoose');

// Import CORs middleware to allow connections from another URL:PORT
const cors = require('cors');

// Import mLab connection string
const cs = require('./mlab-connection-string');

// Import GraphQL Schema used
const schema = require('./schema/schema');

// Create a new app based on Express
const app = express();

// Allow cross origin requests
app.use(cors());

// Connect to database
mongoose.connect(
  cs,
  { useNewUrlParser: true }
);

mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

// Configure and add the GraphQL middleware
app.use('/graphql', expressGraphQL({
    schema, // how our data look like (our graph look like)
    graphiql: true
}));

// Start listening for requests on PORT 4000 on this machine
app.listen(4000, () => {
    console.log('Listening for requests on port 4000');
}); 
