import { useDispatch,  } from "react-redux";
import { recipeActions } from "../../store/recipe-slice";
import { fetchResults } from "../../store/recipe-actions";

import Icons from "../../assets/images/icons.svg";

import classes from "./SearchBar.module.scss";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only dispatch if searchQuery has content
      dispatch(recipeActions.setQuery({ query: searchQuery }));
      dispatch(fetchResults(searchQuery));
    }, 500); // Reduced delay to 500ms for better UX

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  const searchInputHandler = (event) => {
    setSearchQuery(event.target.value.trim());
  };

  return (
    <form className={classes.search}>
      <input
        type="text"
        id="search"
        className={classes.search__field}
        placeholder="Search over 1,000,000 recipes..."
        value={searchQuery}
        onChange={searchInputHandler}
      />
      <button className={`${classes.btn} ${classes.search__btn}`}>
        <svg className={classes.search__icon}>
          <use href={`${Icons}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
