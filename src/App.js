import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AlertContextProvider } from "./contexts/AlertContext";
import { ItemPage, Home, Login } from "./pages";
import PrivateRoute from "./utils/PrivateRoute";
import Route from "./utils/Route";

function App() {
  return (
    <Router>
      <AlertContextProvider>
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
      </AlertContextProvider>
    </Router>
  );
}

export default App;
