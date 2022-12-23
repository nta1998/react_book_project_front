import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Bottom from "./Bottom";
import Books from "./Books";
import Customer from "./Customer";
import Loans from "./Loans";


const App=()=> {
  return (
    <Router>
    <div className="App">
      <NavBar></NavBar>
        <div>
        <Switch>
        <Route  exact path="/react_book_project_front">
            <Books></Books>
        </Route>
        <Route  exact path="/react_book_project_front/Coustomers">
          <Customer></Customer>
        </Route>
        <Route  exact path="/react_book_project_front/Loans">
          <Loans></Loans>
        </Route>
        </Switch>
        </div>
    </div>
    <Bottom></Bottom>
    </Router>
  );
}

export default App;
