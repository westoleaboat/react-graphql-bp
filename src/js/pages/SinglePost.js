import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const graphqlToken = process.env.GRAPHQL_TOKEN;
const endpoint = graphqlToken;

const SinglePost = () => {
  const { slug } = useParams(); // obtained from AllPost when clicking, slug is variable for dynamic rendering
  const [post, setPost] = useState(null); // fetch post data
  const [pcedges, setPcedges] = useState([]); // Create a state for PostConnect edges (next and prev posts)
  const [currentPostIndex, setCurrentPostIndex] = useState(0); // Initialize currentPostIndex to 0

  // Your GraphQL query, slug is variable when fetching
  // Query also PostConnection for suggesting other posts.
  const query = `query MyQuery($slug: String!) {
    posts(where: {slug: $slug}) {
      title
      excerpt
      id
      date
      slug
      content {
        markdown
      }
      coverImage {
        url
      }
      author {
        name
        title
        picture {
          url
        }
      }
    }
    postsConnection (orderBy: date_DESC){
      edges {
        node {
          title
          slug
          date
        }
      }
    }
  }
  `;
    const variables = { //this const 'variables' is not used because dynamic variable { slug } defined below is for dynamic content
      "slug": slug,
    };

    const formatDate = (dateString) => { //Date formatting
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    };
  
  // fetchData defined outside useEffect hook, for dynamic calling for every different slug
  const fetchData = async (slug) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { slug }, // Pass the slug as the variable
        }),
      });
  
      const responseData = await response.json();
      const edges = responseData.data.posts; // define post data
      const pcEdges = responseData.data.postsConnection.edges; // define next and prev posts from PostConnect (in query)
  
      setPcedges(pcEdges);
      // next and prev posts routing by setting the post slug
      setCurrentPostIndex(pcEdges.findIndex((pcedge) => pcedge.node.slug === slug));
  
      if (edges && edges.length > 0) {
        setPost(edges[0]); //first value([0]) of query always is post data
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setPost(null);
    }
  };
  
  // React hook
  useEffect(() => {
    fetchData(slug); //call fetchData with post content depending on slug
    // second arg for useEffect is slug to check for changes.
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // set next and prev post; (orderBy: date_DESC) in graphQL query is necessary for this order to work, otherwise links are random
  const nextPost = pcedges[currentPostIndex + 1]?.node;
  const previousPost = pcedges[currentPostIndex -1]?.node;

  //set slug in order for post content to fetch
  const handleNextPostClick = () => {
    if (currentPostIndex + 1 < pcedges.length) {
      const nextPostSlug = pcedges[currentPostIndex + 1]?.node.slug;
      if (nextPostSlug) {
        fetchData(nextPostSlug); 
      }
    }
  };
  
  const handlePreviousPostClick = () => {
    if (currentPostIndex - 1 >= 0) {
      const previousPostSlug = pcedges[currentPostIndex - 1]?.node.slug;
      if (previousPostSlug) {
        fetchData(previousPostSlug);
      }
    }
  };
  

  return (
    <main class='post'>

      <article>

          <section class='post__header'>

            <div class="formatedDate">
              <dl>{formatDate(post.date)}</dl>
            </div>

            <h2>{post.title}</h2>

          </section>

          <section class='post__content'>

            <dl class="post__content__detail">

              <div class="post__content__detail__img-container">
                {/* if no picture from query use hardcoded placeholder */}
                {post.author.picture && post.author.picture.url ? ( <img src={post.author.picture.url}/> ) : ( <img src='https://26159260.fs1.hubspotusercontent-eu1.net/hubfs/26159260/personalBlog/cv-big-photo2.png'/> )}
              </div>

              <div>
                <p class='post__content__detail__author'>{post.author.name}</p>
                <p class='post__content__detail__title'>{post.author.title}</p>
              </div>


            </dl>

            <div className="post__content__post-content">

              <div class='post__content__post-content__img-container'>
                {/* if no picture from query use hardcoded placeholder */}
                {post.coverImage && post.coverImage.url ? (<img id='post-img' src={post.coverImage.url} /> ) : ( <img id='post-img' src='https://26159260.fs1.hubspotusercontent-eu1.net/hubfs/26159260/personalBlog/cover-img2.jpg' />)}
              </div>

              <hr />
              
              <div className='post__content_post-content__markdown'>
                <ReactMarkdown>{post.content.markdown}</ReactMarkdown> {/* render MarkDown content (post body) */}
              </div>
            
            </div>

            <div class="post__content__footer">

              <div class='post__content__footer__other-posts'>
                <hr />
                {/* if there is no nextPost or prevPost, dont show link option */}
                {nextPost && (
                  <div>
                    <p>NEXT POST</p>
                    <Link to={`/posts/${nextPost.slug}`} onClick={handleNextPostClick}>{nextPost.title}</Link>
                  </div>
                )}

                {previousPost && (
                  <div>
                    <p>PREVIOUS POST</p>
                    <Link to={`/posts/${previousPost.slug}`} onClick={handlePreviousPostClick}>{previousPost.title}</Link>
                  </div>
                )}

              </div>
              <hr />

              <div class='post__content__footer__backlink'>
                <Link to={'/'}>← Back to the blog</Link>
              </div>

            </div>


            

          </section>

      </article>

    </main>
  );
};

export default SinglePost;

