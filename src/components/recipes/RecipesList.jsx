import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "../../store/recipe-actions";

import RecipeItem from "./RecipeItem";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notification from "../UI/Notification";
import Pagination from "../UI/Pagination";

import classes from "./RecipesList.module.scss";

const RecipesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.recipe.search.query);
  const searchResults = useSelector((state) => state.recipe.search.results);
  const isLoading = useSelector((state) => state.ui.isLoading);

  useEffect(() => {
    dispatch(fetchResults("pizza"));
  }, [dispatch]);

  const newSearchResults = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 10;  // starting index of current page
    const lastPageIndex = firstPageIndex + 10;      // ending index of current page
    return searchResults.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchResults]);

  return (
    <>
      {!isLoading &&
        Array.isArray(searchResults) &&
        searchResults.length === 0 && (
          <Notification
            notification={{
              status: "error",
              message: "No recipes found for your query! Please try again!",
            }}
          />
        )}

      {!isLoading && searchResults.length !== 0 && (
        <div className={classes["search-results"]}>
          <div>
            <h4 className={classes["search-results__num"]}>
              {searchQuery.length !== 0 &&
                `${searchResults.length} results for: "${searchQuery}"`}
              {searchQuery.length === 0 && "The latest pizza recipes: "}
            </h4>
            <ul className={classes.results}>
              {newSearchResults.map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
              ))}
            </ul>
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={searchResults.length}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default RecipesList;
