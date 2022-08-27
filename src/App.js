import './App.css';
import Posts from './Posts'

// console.log(process.env.REACT_APP_NASA_KEY)

function App() {
  return (
    <div className="App">
      <h1>Mars Rover Photos</h1>
      <Posts />
    </div>
  );
}

export default App;
 