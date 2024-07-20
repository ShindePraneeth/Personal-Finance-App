const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Transaction {
    id: ID!
    userId: ID!
    description: String!
    category: String!
    amount: Float!
    date: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    getTransactions: [Transaction!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addTransaction(description: String!, category: String!, amount: Float!, date: String!): Transaction!
  }
`;

module.exports = { typeDefs };