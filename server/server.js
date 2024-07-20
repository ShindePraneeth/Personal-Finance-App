const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, 'your_jwt_secret');
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      console.error('GraphQL Error:', err);
      return err;
    },
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      // Implement proper token verification here
      return { user: { id: '1' } }; // For testing, always return a user
    },
  });
  
  async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
  
    app.use((err, req, res, next) => {
      console.error('Express error:', err);
      res.status(500).send('Something broke!');
    });
  
    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  }
  
  startServer().catch(error => {
    console.error('Failed to start the server:', error);
  });