import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";

import classes from "../App.module.scss";

const RootLayout = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
