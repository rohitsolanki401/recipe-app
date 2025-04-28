import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getRecipe } from "../store/recipe-actions";

import RecipeDetails from "../components/recipes/RecipeItemDetails";

const RecipeDetailsPage = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.recipe.bookmarks);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipe(id, bookmarks));
  }, [dispatch, id, bookmarks]);

  return <RecipeDetails />;
};

export default RecipeDetailsPage;
