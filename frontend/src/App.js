import './App.css'
import FlowGrid from './component/FlowGrid'
import AdTemplate from './component/AdTemplate.jsx'
import AdGrid from './component/AdGrid.jsx'
import NavBar from './component/NavBar.jsx'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import DetailedView from './component/DetailedView.jsx'

function App() {
  return (
    <Router> 
      <div className="App">

        <NavBar />

        <Switch>
          <Route path="/" exact component={FlowGrid} />
          <Route path="/create" exact component={AdTemplate} />
          <Route path="/inventory" exact component={AdGrid} />
          <Route path="inventory/:id"><DetailedView /></Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
