import './App.css';
import FlowGrid from './component/FlowGrid';
// import AdTemplate from './component/AdTemplate.jsx'
// import AdGrid from './component/AdGrid.jsx'
import NavBar from './component/NavBar.jsx'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div id='grid'>
        <FlowGrid />
      </div>
    </div>
  );
}

export default App;
