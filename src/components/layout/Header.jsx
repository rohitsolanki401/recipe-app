import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { recipeActions } from "../../store/recipe-slice";

import SearchBar from "./SearchBar";
import BookmarksList from "../recipes/BookmarksList";
import Logo from "../../assets/images/logo.png";
import Icons from "../../assets/images/icons.svg";

import classes from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    dispatch(recipeActions.loadBookmarks());
  }, [dispatch]);

  const showBookmarksListHandler = () => {
    setShowBookmarks((prevState) => !prevState);
  };

  const navContent = (
    <nav className={classes.nav}>
      <ul className={classes.nav__list}>
        <li className={classes.nav__item}>
          <Link
            to="new-recipe"
            className={`${classes.nav__btn} ${classes["nav__btn--add-recipe"]}`}
          >
            <svg className={classes.nav__icon}>
              <use href={`${Icons}#icon-edit`}></use>
            </svg>
            <span>Add recipe</span>
          </Link>
        </li>
        <li className={classes.nav__item}>
          <button
            className={`${classes.nav__btn} ${classes["nav__btn--bookmarks"]}`}
            onClick={showBookmarksListHandler}
          >
            <svg className={classes.nav__icon}>
              <use
                href={`${Icons}#${
                  showBookmarks ? "icon-bookmark-fill" : "icon-bookmark"
                }`}
              ></use>
            </svg>
            <span>Bookmarks</span>
          </button>
          <BookmarksList active={showBookmarks} />
        </li>
      </ul>
    </nav>
  );

  return (
    <header className={classes.header}>
      <Link to="/">
        <img src={Logo} alt="Logo" className={classes.header__logo} />
      </Link>
      <SearchBar />
      {navContent}
    </header>
  );
};

export default Header;
