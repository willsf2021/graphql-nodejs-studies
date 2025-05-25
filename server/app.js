import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./schema/schema.js";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

mongoose.connect(
  "mongodb+srv://willsf2015:5hytPUCWMVeVrkxu@gql-ninja.44sryx3.mongodb.net/?retryWrites=true&w=majority&appName=gql-ninja"
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
  schema,
  introspection: true,
});

await server.start();

app.use("/graphql", expressMiddleware(server));

app.get("/graphiql", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>GraphiQL</title>
        <link href="https://cdn.jsdelivr.net/npm/graphiql@3/graphiql.min.css" rel="stylesheet"/>
      </head>
      <body>
        <div id="graphiql" style="height: 100vh;"></div>
        <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/graphiql@3/graphiql.min.js"></script>
        <script>
          const fetcher = GraphiQL.createFetcher({ 
            url: window.location.origin + '/graphql'
          });
          ReactDOM.render(
            React.createElement(GraphiQL, { fetcher }),
            document.getElementById('graphiql')
          );
        </script>
      </body>
    </html>
  `);
});

app.listen(4000, () => {
  console.log(`
  🔍 Interface GraphiQL em: http://localhost:4000/graphiql
  `);
});
