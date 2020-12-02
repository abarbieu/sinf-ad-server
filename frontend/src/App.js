import "./App.css";
import FlowGrid from "./component/FlowGrid";
import AdTemplate from "./component/AdTemplate.jsx";
import AdGrid from "./component/AdGrid.jsx";
import NavBar from "./component/NavBar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailedView from "./component/DetailedView.jsx";
import ShowReport from "./component/ShowReport.jsx";
import EditView from "./component/EditView.jsx";
import axios from "axios";

function App() {
   const notFound = () => {
      return (
         <div>
            <h1>404 page not found</h1>
         </div>
      );
   };

   return (
      <Router>
         <div className='App'>
            <NavBar />

            <Switch>
               <Route path='/' exact component={FlowGrid} />
               <Route path='/create' exact component={AdTemplate} />
               <Route path='/inventory/:id/edit' component={EditView} />
               <Route path='/inventory/:id' component={DetailedView} />
               <Route path='/inventory' exact component={AdGrid} />
               <Route path='/create/flight' exact component={NavBar} />
               <Route path='/report' exact component={ShowReport} />
               <Route path='*' component={notFound} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;
