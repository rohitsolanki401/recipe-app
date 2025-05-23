import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import classes from "../App.module.scss";

const RootLayout = () => {
  const { pathname } = useLocation();

  // if we’re on the login route, render *only* the outlet (no header / container)
  if (pathname === "/login") {
    return <Outlet />;
  }

  // otherwise, render your normal app layout
  return (
    <div className={classes.container}>
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
