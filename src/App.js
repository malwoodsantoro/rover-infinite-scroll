import "./App.css";
import Posts from "./Posts";
import styled from "styled-components";
import Img from './stars.jpg'

const StyledHeader = styled.div`
  padding: 10rem;
  font-size: 1rem;
  background: url(${Img});
  color: #fff;
`;

function App() {
  return (
    <div className="App">
      <StyledHeader>
        <h1>Rovergram</h1>
        <p>
          Images taken from NASA's Curiosity, Opportunity, and Spirit rovers on
          Mars.
        </p>
      </StyledHeader>
      <Posts />
    </div>
  );
}

export default App;
