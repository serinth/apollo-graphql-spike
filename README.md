Example of GraphQL using RESTful resolvers and the [Apollo](https://www.apollographql.com/) framework.

# QuickStart

```bash
npm install
npm start
```

Navigate to http://localhost:4000/graphql


# Endpoint

There is a sample RESTful endpoint put in to retrieve a user at `localhost:4000/user/someid`
```bash
curl localhost:4000/user/someid
```

# Sample GraphQL Query
Retrieve a user object from graphql
```graphql
query{
  getUser(id:"someid") {
    id,
    firstName
  }
}
```
