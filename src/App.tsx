import { State } from "./state";
import { useSelector } from "react-redux";
import { Route as ReactRoute, Routes, Navigate } from "react-router-dom";
import { Route } from "./routes";
import { FC } from "react";
import { Login } from "./pages/Login";
import { Backdrop, CircularProgress } from "@mui/material";
import { Home } from "./pages/Home";

const PrivateRoute: FC = ({ children }) => {
  const isAuthenticated = !!useSelector((state: State) => state.user).token
    ?.accessToken;
  if (isAuthenticated && children) {
    return <>{children}</>;
  }
  return <Navigate to={Route.LOGIN} />;
};

function App() {
  const userStore = useSelector((state: State) => state.user);
  return (
    <>
      <Routes>
        <ReactRoute
          path={Route.HOME}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <ReactRoute path={Route.LOGIN} element={<Login />} />
      </Routes>
      <Backdrop
        open={userStore.isFetching}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default App;
