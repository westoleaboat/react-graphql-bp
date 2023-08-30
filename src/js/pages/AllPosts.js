// AllPosts.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// Access the GraphQL token using the environment variable
const graphqlToken = process.env.GRAPHQL_TOKEN;

// GraphQL endpoint URL
const endpoint = graphqlToken;

const AllPosts = () => {
  // get title and ID when clicking on a post (see below)
  const handleClick = (id, title) => {
      console.log('Title:', title);
      console.log('ID:', id);
  };
  
  const [data, setData] = useState([]);

  // Your GraphQL query and variables
  const query = `query MyQuery {
      posts (orderBy: date_DESC){
        title
        excerpt
        id
        date
        slug
      }
    }`;
  const variables = {
  // "first": 25,
  };

  // format date from 15.07.2020 to weekday, Month dayNum, year.
  const formatDate = (dateString) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
  };
    
  // React hook   
  useEffect(() => {
    // fetchData: asynchronous function to fetch data
    async function fetchData() {
      try {
        // fetch: send POST request to endpoint
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            // include query and variables
            query,
            variables,
          }),
        });
        // Response from server is parsed as JSON
        const responseData = await response.json();
        // assuming response is object with data, page property and edge array
        const edges = responseData.data.posts;
        // console.log(edges)

        // new response state
        setData(edges);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
    // By passing an empty dependency array (second argument of useEffect), 
    // you tell React not to watch for any changes in specific dependencies 
    // and only run the effect once. 
    // For example see dynamic routing depending on slug (see SinglePost.js )

  }, []); // Run the effect only once on component mount

  return (
    // rendering the fetched data

    <main> {/* top-level container */}

      {/* Display the fetched data here */}
      <section class="title">
        <h1>Latest</h1>
        <p>Our latest blog posts.</p>
      </section>

      <section>

        <ul>

          {data.map((edge, index) => (
          <li key={index} onClick={() => handleClick(edge.id, edge.title)}> {/* handle click for post title and ID*/}

            <div class="article">

              <div class="formatedDate">
                  <dl>{formatDate(edge.date)}</dl> {/* formatted date */}
              </div>

              <div class="article__text">
                <div>
                  <h2><Link to={`/posts/${edge.slug}`}>{edge.title}</Link></h2> {/* use Link for dynamic routing */}
                  <p>{edge.excerpt}</p>
                </div>
                <span><a href={`/posts/${edge.slug}`}>Read more →</a></span> 
              </div>

            </div>
          
          </li>
          ))}

        </ul>

      </section>
    </main>
  );
};

export default AllPosts;