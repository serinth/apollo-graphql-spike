const express = require('express');
const path = require('path');
const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server-express');
const UsersAPI = require('./apollo/userDataSource');
const PORT = 4000;

const app = express();

const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf8'));

const resolvers = {
  Query: {
      getUser: async(_source, {id}, {dataSources}) => {
          data = dataSources.usersAPI.getUser(id);
          return data;
      }
  },
  User: {
      id(parent) {
        return parent.id;
      },
      firstName(parent) {
        return parent.firstName;
      },
      lastName(parent) {
        return parent.lastName;
      }
  }
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => {
    return {
        // By default, uses in memory LRU cache. Can be swapped for memcache or Redis.
        // https://www.apollographql.com/docs/apollo-server/data/data-sources/
        usersAPI: new UsersAPI() 
    };
  }
});
server.applyMiddleware({ app });

app.get('/user/:userId', function(req, res){
  res.json({
    id: req.params.userId,
    firstName: 'firstName',
    lastName: 'lastName'
  });
});

app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)




