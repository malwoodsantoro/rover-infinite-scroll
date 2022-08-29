
import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";

interface ImgModalProps {
  isShowing: boolean,
  hide: Function,
  src: string
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: .5;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`

const ModalMain = styled.div`
  z-index: 100;
  width: 40rem;
  background: white;
  position: relative;
  margin: 10rem auto;
  border-radius: 3px;
  max-width: 500px;
  padding: 2rem;
  > p {
    color: gray;
  }
`

const ModalCloseButton = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  opacity: .3;
  cursor: pointer;
  border: none;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImgModal = ({ isShowing, hide, src }: ImgModalProps) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <ModalOverlay />
    <ModalWrapper>
      <ModalMain>
        <ModalCloseButton onClick={() => hide()}>X</ModalCloseButton>
        <Img src={src} alt={`Large photo`} />
      </ModalMain>
    </ModalWrapper>
  </React.Fragment>, document.body
) : null;

export default ImgModal;