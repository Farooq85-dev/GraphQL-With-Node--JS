const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const { USERS } = require("./users.js");
const { TODOS } = require("./todos.js");

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
        type Todo {
            id: String,
            title: String,
            completed: Boolean,
        }
    
        type User {
            name: String,
            email: String,
            username: String,
        }
        
        type Query {
            getTodos:[Todo],
            getUsers:[User],
            getUserById(id:Int):User
        }
    `,

    resolvers: {
      Query: {
        getTodos: async () => TODOS,
        getUsers: async () => USERS,
        getUserById: async (parent, { id }) =>
          USERS.find((user) => user.id === id),
      },
    },
  });

  app.use(express.json());
  app.use(cors({ origin: "*" }));
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  const PORT = 8000;
  app.listen(PORT, () => console.log(`Serevr Running at:- ${PORT}`));
};

startServer();
