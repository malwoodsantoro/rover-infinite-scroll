import styled from 'styled-components'

const StyledPost = styled.div`
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  margin: 0.25rem;
  padding: 2rem;
`
type PostProps = {
  fullName: string,
  landingDate: string,
  launchDate: string
}

const Post = ({fullName, landingDate, launchDate}: PostProps) => {

  return (
    <StyledPost>
      <h2>{fullName}</h2>
      <p>Launch date: {launchDate}</p>
      <p>Landing date: {landingDate}</p>
    </StyledPost>
  )
}

export default Post