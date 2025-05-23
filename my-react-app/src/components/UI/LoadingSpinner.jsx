import Icons from "../../assets/images/icons.svg";

import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={classes.spinner}>
      <svg>
        <use href={`${Icons}#icon-loader`}></use>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
