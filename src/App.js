import './App.css';
import Posts from './Posts'

// console.log(process.env.REACT_APP_NASA_KEY)

function App() {
  return (
    <div className="App">
      <h1>Rovergram</h1>
      <p>Images taken from NASA's Curiosity, Opportunity, and Spirit rovers on Mars.</p> 
      <Posts />
    </div>
  );
}

export default App;
 