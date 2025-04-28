import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout.jsx";
import ErrorPage from "./pages/Error.jsx";
import RecipesPage from "./pages/Recipes.jsx";
import RecipeDetailsPage from "./pages/RecipeDetails.jsx";
import NewRecipePage from "./pages/NewRecipe.jsx";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <RecipesPage />,
          children: [
            {
              path: ":id",
              element: <RecipeDetailsPage />,
            },
          ],
        },
        {
          path: "new-recipe",
          element: <NewRecipePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;