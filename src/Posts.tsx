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
  imgSrc: string;
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

// @ts-ignore
  const handleErrors = (response) => {
    if (!response.ok) throw new Error(response.status);
    return response;
  }

  const loadMorePosts = () => {
    setPage((page) => page + 1);
    setLoading(true);
    setTimeout(() => {
      fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=` + process.env.REACT_APP_NASA_KEY)
        .then(handleErrors)
        .then((response) => response.json())
        .then((data : Posts) => {
          // @ts-ignore
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