import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../../store/recipe-slice";
import { fetchResults } from "../../store/recipe-actions";

import Icons from "../../assets/images/icons.svg";

import classes from "./SearchBar.module.scss";
import { useState } from "react";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchFormHandler = (event) => {
    event.preventDefault();
    dispatch(recipeActions.setQuery({ query: event.target.search.value }));
    dispatch(fetchResults(event.target.search.value));
    setSearchQuery("");
  };

  return (
    <form className={classes.search} onSubmit={searchFormHandler}>
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
