import React, { useState, useEffect } from 'react'
import Post from './Post'
import InfiniteScroll from './InfiniteScroll'
import styled from 'styled-components'
import Select from 'react-select'

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
  Opportunity = "Opportunity", 
  Spirit = "Spirit"
}

const selectOptions = [
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'spirit', label: 'Spirit' },
  { value: 'opportunity', label: 'Opportunity' }
]

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
  const [selectedValue, setSelectedValue] = useState(selectOptions[0])

  const hasMoreData = posts.length < 2000;

  const handleErrors = (response: Response) => {
    if (!response.ok) throw new Error(response.status.toString())
    return response;
  }

  const fetchPosts = async (page: number, rover: string): Promise<Posts> => {
    const data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${page}&api_key=` + process.env.REACT_APP_NASA_KEY).then((res) => {
      handleErrors(res)
      return res.json();
    });

    return data;
  };

const loadMorePosts = () => {
  setPage((page) => page + 1);
  setLoading(true);
  setTimeout(() => {
    fetchPosts(page, selectedValue.value)
      .then((data: Posts) => {
        setPosts((prev) => [...prev, ...data.photos])
      })
    setLoading(false);
  }, 300);
};

useEffect(() => {
  fetchPosts(1, selectedValue.value)
    .then((data: Posts) => {
      setPosts(data.photos)
    })

}, []);

useEffect(() =>{
  fetchPosts(1, selectedValue.value)
  .then((data: Posts) => {
    setPosts(data.photos)
  })
}, [selectedValue])

//@ts-ignore
const handleSelectChange = (item) => {
  setSelectedValue(item);
}

return (
  <InfiniteScroll
    hasMoreData={hasMoreData}
    isLoading={loading}
    onBottomHit={loadMorePosts}
    loadOnMount={true}
  >
    <Select value={selectedValue} options={selectOptions} onChange={handleSelectChange} />
    <StyledPosts>
      {
        posts.map((post, index) => {
          return <Post roverName={post.rover.name} fullName={post.camera.full_name} landingDate={post.rover.landing_date} launchDate={post.rover.launch_date} imgSrc={post.img_src} />
        }
        )}
    </StyledPosts>

  </InfiniteScroll>
)
}

export default Posts