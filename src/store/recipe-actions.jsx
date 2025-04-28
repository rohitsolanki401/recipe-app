import { recipeActions } from "./recipe-slice";
import { uiActions } from "./ui-slice";

export const fetchResults = (query) => {
  return async (dispatch) => {
    const fetchRecipes = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=0a5b5dab-cd85-4d6f-95c5-b897efe52237`
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Could not fetch recipes list!");
      }

      return responseData.data.recipes;
    };

    try {
      dispatch(uiActions.setIsLoading(true));
      const data = await fetchRecipes();

      const recipes = data.map((recipe) => {
        return {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          image_url: recipe.image_url,
          ...(recipe.key && { key: recipe.key }),
        };
      });

      await dispatch(recipeActions.replaceResults({ recipes: recipes }));
    } catch (error) {
      throw error;
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const sendData = (data) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));

    const sendRequest = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/?key=0a5b5dab-cd85-4d6f-95c5-b897efe52237`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Uploading recipe failed.");
      }

      const responseData = await response.json();
      return responseData.data.recipe;
    };

    try {
      const recipe = await sendRequest();

      dispatch(recipeActions.loadRecipe(recipe));
      dispatch(recipeActions.addBookmark(recipe));
    } catch (error) {
      throw error;
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const getRecipe = (id, bookmarks) => {
  return async (dispatch) => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch recipe!");
      }

      const responseData = await response.json();

      const data = responseData.data.recipe;
      console.log("recipe data: ", data);
      const recipe = { ...data, bookmarked: false };

      if (bookmarks.find((bookmark) => bookmark.id === recipe.id)) {
        recipe.bookmarked = true;
      }

      return recipe;
    };

    try {
      const recipe = await fetchRecipe();
      dispatch(recipeActions.loadRecipe(recipe));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    const deleteRequest = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=0a5b5dab-cd85-4d6f-95c5-b897efe52237`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Could not delete the recipe!");
      }
    };

    try {
      await deleteRequest();
    } catch (error) {
      throw error;
    }
  };
};
