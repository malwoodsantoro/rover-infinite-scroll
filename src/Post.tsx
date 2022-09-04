import React from "react";
import styled from "styled-components";
import ImgModal from "./ImgModal";
import useModal from "./useModal";

interface PostProps {
  roverName: string;
  fullName: string;
  landingDate: string;
  launchDate: string;
  imgSrc: string;
}

const StyledPost = styled.div`
  border: solid 1px black;
  display: flex;
  flex-direction: column;
  margin: 0.25rem;
  padding: 2rem;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Post = ({
  roverName,
  fullName,
  landingDate,
  launchDate,
  imgSrc,
}: PostProps) => {
  const { isShowing, toggle } = useModal();

  return (
    <StyledPost>
      <Img
        src={imgSrc}
        alt={`Rover photo taken on ${landingDate}`}
        onClick={() => toggle()}
      />
      <p>Launch date: {launchDate}</p>
      <p>Landing date: {landingDate}</p>
      <p>{fullName}</p>
      <ImgModal isShowing={isShowing} hide={toggle} src={imgSrc} />
    </StyledPost>
  );
};

export default Post;
