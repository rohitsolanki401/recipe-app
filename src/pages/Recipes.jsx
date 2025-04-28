import { Outlet } from "react-router-dom";

import RecipesList from "../components/recipes/RecipesList";

const RecipesPage = () => {
  return (
    <>
      <RecipesList />
      <div style={{ gridArea: "recipe", backgroundColor: "#f9f5f3" }}>
        <Outlet />
      </div>
    </>
  );
};

export default RecipesPage;
