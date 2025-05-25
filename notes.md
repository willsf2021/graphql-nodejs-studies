## An API RESTful Aproach

- Endpoint for getting a particular book:
  <br>
  <br>
  `domain.com/books/:id`
  <br>
  `title, genre, reviews, authorId`

- Endpoint for getting the author info of that book:
  <br>
  <br>
  `domain.com/authors/:id`
  <br>
  `name, age, biography, booksIds`

### Two requests to get linked informations.

## An API GraphQL Aproach

- Query to get <strong>book data </strong>and it´s <strong>author data </strong>(AND the other books):

<pre>
{
    <span style="color: pink;">book(id:123){</span>
        title
        genre
        reviews
        <span style="color: pink;">author {</span>
            name
            bio
            <span style="color: pink;">books{</span>
                name
            <span style="color: pink;">}
        }
    }
}</span>
</pre>

### One request to get a lot of informations.

