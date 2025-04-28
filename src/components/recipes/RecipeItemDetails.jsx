import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useNavigate } from "react-router-dom";

import { recipeActions } from "../../store/recipe-slice";
import { deleteRecipe, fetchResults } from "../../store/recipe-actions";

import LoadingSpinner from "../UI/LoadingSpinner";
import Icons from "../../assets/images/icons.svg";

import fracty from "fracty";
import classes from "./RecipeItemDetails.module.scss";
import { useState } from "react";

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe.recipe);
  const query = useSelector((state) => state.recipe.search.query);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const decreaseServingsHandler = (event) => {
    dispatch(recipeActions.updateServings(-1));
  };

  const increaseServingsHandler = (event) => {
    dispatch(recipeActions.updateServings(1));
  };

  const addBookmarkHandler = () => {
    dispatch(recipeActions.addBookmark(recipe));
  };

  const deleteRecipeHandler = () => {
    setIsLoading(true);
    dispatch(deleteRecipe(recipe.id));
    dispatch(recipeActions.addBookmark(recipe));

    setTimeout(() => {
      if (query.length !== 0) {
        dispatch(fetchResults(query));
      }
      setIsLoading(false);
      navigate("../");
    }, 1500);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        navigation.state === "idle" &&
        Object.keys(recipe).length !== 0 && (
          <div className={classes.recipe}>
            <figure className={classes.recipe__fig}>
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className={classes.recipe__img}
              />
              <h1 className={classes.recipe__title}>
                <span>{recipe.title}</span>
              </h1>
            </figure>

            <div className={classes.recipe__details}>
              <div className={classes.recipe__info}>
                <svg className={classes["recipe__info-icon"]}>
                  <use href={`${Icons}#icon-clock`}></use>
                </svg>
                <span
                  className={`${classes["recipe__info-data"]} ${classes["recipe__info-data--minutes"]}`}
                >
                  {recipe.cooking_time}
                </span>
                <span>minutes</span>
              </div>

              <div className={classes.recipe__info}>
                <svg className={classes["recipe__info-icon"]}>
                  <use href={`${Icons}#icon-users`}></use>
                </svg>
                <span className={classes["recipe__info-data"]}>
                  {recipe.servings}
                </span>
                <span>servings</span>

                <div className={classes["recipe__info-buttons"]}>
                  <button
                    className={`${classes["btn--tiny"]} ${classes["btn--update-servings"]}`}
                    onClick={decreaseServingsHandler}
                  >
                    <svg>
                      <use href={`${Icons}#icon-minus-circle`}></use>
                    </svg>
                  </button>
                  <button
                    className={`${classes["btn--tiny"]} ${classes["btn--update-servings"]}`}
                    onClick={increaseServingsHandler}
                  >
                    <svg>
                      <use href={`${Icons}#icon-plus-circle`}></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className={`${classes["recipe__user-generated"]} ${
                  recipe.key ? "" : classes.hidden
                }`}
              >
                <svg>
                  <use href={`${Icons}#icon-user`}></use>
                </svg>
              </div>

              <button
                className={`${classes["btn--round"]} ${classes["btn--bookmark"]}`}
                onClick={addBookmarkHandler}
              >
                <svg>
                  <use
                    href={`${Icons}#${
                      recipe.bookmarked ? "icon-bookmark-fill" : "icon-bookmark"
                    }`}
                  ></use>
                </svg>
              </button>

              <button
                className={`${classes["btn--round"]} ${
                  classes["btn--delete"]
                } ${recipe.key ? "" : classes.hidden}`}
                onClick={deleteRecipeHandler}
              >
                <svg>
                  <use href={`${Icons}#icon-delete`}></use>
                </svg>
              </button>
            </div>

            <div className={classes.recipe__ingredients}>
              <h2 className={classes["heading--2"]}>Recipe ingredients</h2>
              <ul className={classes["recipe__ingredient-list"]}>
                {recipe.ingredients.map((ingr) => (
                  <li
                    key={`${recipe.title}${ingr.quantity}${ingr.unit}${ingr.description}`}
                    className={classes.recipe__ingredient}
                  >
                    <svg className={classes.recipe__icon}>
                      <use href={`${Icons}#icon-check`}></use>
                    </svg>
                    <div className={classes.recipe__quantity}>
                      {ingr.quantity ? fracty(ingr.quantity) : ""}
                    </div>
                    <div className={classes.recipe__description}>
                      <span className={classes.recipe__quantity}>
                        {ingr.unit}
                      </span>
                      {ingr.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={classes.recipe__directions}>
              <h2 className={classes["heading--2"]}>How to cook it</h2>
              <p className={classes["recipe__directions-text"]}>
                This recipe was carefully designed and tested by
                <span className={classes.recipe__publisher}>
                  {recipe.publisher}
                </span>
                . Please check out directions at their website.
              </p>
              <a
                className={`${classes["btn--small"]} ${classes.recipe__btn}`}
                href={recipe.source_url}
              >
                <span>Directions</span>
                <svg className={classes.search__icon}>
                  <use href={`${Icons}#icon-arrow-right`}></use>
                </svg>
              </a>
            </div>
          </div>
        )}
    </>
  );
};

export default RecipeDetails;
