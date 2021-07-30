import { lazy } from "react";
import { Suspense } from "react-is";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AlertContextProvider } from "./contexts/AlertContext";
import PrivateRoute from "./utils/PrivateRoute";
import Route from "./utils/Route";
const ItemPage = lazy(() => import("./pages/item"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Router>
      <AlertContextProvider>
        <div>
          <Suspense fallback={<div></div>}>
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
          </Suspense>
        </div>
      </AlertContextProvider>
    </Router>
  );
}

export default App;
