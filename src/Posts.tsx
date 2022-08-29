import React, { useState, useEffect } from 'react'
import Post from './Post'
import InfiniteScroll from './InfiniteScroll'
import styled from 'styled-components'

export interface Posts {
  photos: Photo[];
}

export interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earthDate: Date;
  rover: Rover;
}

export interface Camera {
  id: number;
  name: CameraName;
  roverID: number;
  full_name: string;
}

export enum CameraName {
  Fhaz = "FHAZ",
  Mast = "MAST",
  Rhaz = "RHAZ",
}

export interface Rover {
  id: number;
  name: RoverName;
  landing_date: string;
  launch_date: string;
  status: string;
}

export enum RoverName {
  Curiosity = "Curiosity",
}

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

  const [posts, setPosts] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)

  const hasMoreData = posts.length < 2000;

  const handleErrors = (response: Response) => {
    if (!response.ok) throw new Error(response.status.toString())
    return response;
  }

  const fetchPosts = async (page: number): Promise<Posts> => {
    const data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=` + process.env.REACT_APP_NASA_KEY).then((res) => {
      handleErrors(res)
      return res.json();
    });

    return data;
  };

const loadMorePosts = () => {
  setPage((page) => page + 1);
  setLoading(true);
  setTimeout(() => {
    fetchPosts(page)
      .then((data: Posts) => {
        setPosts((prev) => [...prev, ...data.photos])
      })
    setLoading(false);
  }, 300);
};

useEffect(() => {
  fetchPosts(1)
    .then((data: Posts) => {
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
          return <Post fullName={post.camera.full_name} landingDate={post.rover.landing_date} launchDate={post.rover.launch_date} imgSrc={post.img_src} />
        }
        )}
    </StyledPosts>

  </InfiniteScroll>
)
}

export default Posts