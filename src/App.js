import { useEffect } from "react";
import { lazy } from "react";
import { Suspense } from "react-is";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { AlertContextProvider } from "./contexts/AlertContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import PrivateRoute from "./utils/PrivateRoute";
import Route from "./utils/Route";
const ItemPage = lazy(() => import("./pages/item"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const menuState = useSelector((state) => state.menuState);
  useEffect(() => {
    if (menuState.dark_mode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [menuState]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AlertContextProvider>
        <LoadingContextProvider>
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
        </LoadingContextProvider>
      </AlertContextProvider>
    </BrowserRouter>
  );
}

export default App;
