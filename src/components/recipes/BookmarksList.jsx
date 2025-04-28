import { useSelector } from "react-redux";
import Icons from "../../assets/images/icons.svg";

import classes from "./BookmarksList.module.scss";
import RecipeItem from "./RecipeItem";

const BookmarksList = ({ active }) => {
  const bookmarks = useSelector((state) => state.recipe.bookmarks);

  return (
    <div
      className={`${classes.bookmarks} ${
        active ? classes.bookmarks__active : null
      }`}
    >
      <ul className={classes.bookmarks__list}>
        {bookmarks.length === 0 && (
          <div className={classes.message}>
            <div>
              <svg>
                <use href={`${Icons}#icon-alert-triangle`}></use>
              </svg>
            </div>
            <p>No bookmarks yet. Find a nice recipe and bookmark it.</p>
          </div>
        )}
        {bookmarks.length !== 0 &&
          bookmarks.map((recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
      </ul>
    </div>
  );
};

export default BookmarksList;
