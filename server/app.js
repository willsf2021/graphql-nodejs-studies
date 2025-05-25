import express from "express";
import { schema } from "./schema/schema.js";
import { graphqlHTTP } from "express-graphql";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
