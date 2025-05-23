import { recipeActions } from './recipe-slice';
import { uiActions } from './ui-slice';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5000/api';

export const fetchResults = (query) => {
  return async (dispatch) => {
    const fetchRecipes = async () => {
      // If query is empty, fetch all recipes
      const url = query
        ? `${API_URL}/recipes?search=${query}`
        : `${API_URL}/recipes`;
      const response = await fetch(url);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Could not fetch recipes list!');
      }
      console.log(responseData, 'recipe data :');
      return responseData.data.recipes;
    };

    try {
      dispatch(uiActions.setIsLoading(true));
      const data = await fetchRecipes();

      const recipes = data.map((recipe) => {
        return {
          id: recipe._id,
          title: recipe.title,
          publisher: recipe.publisher,
          image_url: recipe.image_url,
          ...(recipe.key && { key: recipe.key }),
        };
      });

      await dispatch(recipeActions.replaceResults({ recipes: recipes }));
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    } finally {
      dispatch(uiActions.setIsLoading(false));
    }
  };
};

export const sendData = (data) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));

    const sendRequest = async () => {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Uploading recipe failed.');
      }

      const responseData = await response.json();
      return responseData.data.recipe;
    };

    try {
      const recipe = await sendRequest();

      dispatch(recipeActions.loadRecipe(recipe));
      dispatch(recipeActions.addBookmark(recipe));

      // Refresh the recipe list after adding new recipe
      await dispatch(fetchResults('')); // Fetch all recipes
    } catch (error) {
      console.error('Uploading recipe failed.', error);
      throw error;
    } finally {
      dispatch(uiActions.setIsLoading(false));
    }
  };
};

export const getRecipe = (id, bookmarks) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));

    try {
      const response = await fetch(`${API_URL}/recipes/${id}`);
      if (!response.ok) throw new Error('Could not fetch recipe!');

      const responseData = await response.json();
      const raw = responseData.data.recipe;

      if (!raw) {
        throw new Error('Recipe not found');
      }

      // ——— NEW: declare userId and try to populate it
      let userId = null;
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          userId = decoded.id;
        } catch (err) {
          console.warn('Could not decode token', err);
        }
      }

      // ——— Build the recipe object, including likedByUser
      const recipe = {
        ...raw,
        id: raw._id,
        bookmarked: bookmarks.some((bm) => bm.id === raw._id),
        ingredients: Array.isArray(raw.ingredients) ? raw.ingredients : [],
        cooking_time: raw.cooking_time || 0,
        servings: raw.servings || 1,
        likes: raw.likes,
        likedByUser: userId
          ? raw.likes.users.some((u) => u.toString() === userId)
          : false,
      };

      dispatch(recipeActions.loadRecipe(recipe));
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    } finally {
      dispatch(uiActions.setIsLoading(false));
    }
  };
};

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    const deleteRequest = async () => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Could not delete the recipe!');
      }
    };

    try {
      await deleteRequest();
    } catch (error) {
      console.error('Could not delete the recipe!', error);
      throw error;
    }
  };
};

export const toggleBookmark = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/recipes/${id}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Could not update bookmark status');
      }

      const data = await response.json();

      dispatch(
        recipeActions.addBookmark({
          ...data.data.recipe,
          id: data.data.recipe._id,
        })
      );
    } catch (error) {
      console.error('Error updating bookmark:', error);
      throw error;
    }
  };
};

// Likes
export const toggleRecipeLike = (id) => {
  return async (dispatch) => {
    console.log('toggleRecipeLike action started with id:', id);

    const token = localStorage.getItem('token'); //  retrieve the JWT
    if (!token) return;

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
      console.log('Decoded token:', decoded);
      console.log('Decoded User ID:', userId);
    } catch (err) {
      console.error('Invalid token');
      return;
    }

    // optimistically toggle UI?
    try {
      const response = await fetch(`${API_URL}/recipes/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Could not toggle like');

      const resData = await response.json();
      console.log('Like response from backend:', resData); // ✅ Add this

      const { likes } = resData.data.recipe;

      console.log('Dispatching likes update:', {
        id,
        likesCount: likes.count,
        likedByUser: likes.users.includes(userId),
      }); // LOG 3

      // update the recipe in state
      dispatch(
        recipeActions.updateLikes({
          id,
          likesCount: likes.count,
          likedByUser: likes.users.includes(userId),
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
};
