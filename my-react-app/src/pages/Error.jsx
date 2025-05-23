import { useRouteError } from "react-router-dom";

import Header from "../components/layout/Header";

import classes from "../App.module.scss";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className={classes.container}>
      <Header />
      <p>Oops</p>
    </div>
  );
};

export default ErrorPage;
