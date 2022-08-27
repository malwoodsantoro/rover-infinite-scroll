import { useState, useEffect } from 'react'
import Post from './Post'
import styled from 'styled-components'
import InfiniteScroll from './InfiniteScroll'

const StyledPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 2px;
  row-gap: 0.5rem;
  margin: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Posts = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)

  const hasMoreData = posts.length < 2000;

  const handleErrors = (response) => {
    if (!response.ok) throw new Error(response.status);
    return response;
  }

  const loadMorePosts = () => {
    console.log('loadMorePosts')
    setPage((page) => page + 1);
    setLoading(true);
    setTimeout(() => {
      fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=` + process.env.REACT_APP_NASA_KEY)
        .then(handleErrors)
        .then(response => response.json())
        .then((data) => {
          setPosts((prev) => [...prev, ...data.photos])
        })
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=` + process.env.REACT_APP_NASA_KEY)
      .then(response => response.json())
      .then((data) => {
        setPosts(data.photos)
      })

  }, []);

  return (

    <InfiniteScroll
      hasMoreData={hasMoreData}
      isLoading={loading}
      onBottomHit={loadMorePosts}
      loadOnMount={true}
    >
          <StyledPosts>

        {
          posts.map((post, index) => {
            return <Post fullName={post.camera.full_name} landingDate={post.rover.landing_date} launchDate={post.rover.launch_date} />
          }
          )}
    </StyledPosts>

    </InfiniteScroll>
  )
}

export default Posts