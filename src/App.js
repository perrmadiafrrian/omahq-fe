import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ItemPage, Home, Login } from "./pages";
import PrivateRoute from "./utils/PrivateRoute";
import Route from "./utils/Route";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/house/:id">
            <ItemPage />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
