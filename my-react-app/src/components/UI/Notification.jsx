import Icons from "../../assets/images/icons.svg";

import classes from "./Notification.module.scss";

const Notification = ({ notification }) => {
  return (
    <div
      className={`${
        notification.status === "success" ? classes.message : classes.error
      }`}
    >
      <div>
        <svg>
          <use
            href={`${Icons}#icon-${
              notification.status === "success" ? "smile" : "alert-triangle"
            }`}
          ></use>
        </svg>
      </div>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
