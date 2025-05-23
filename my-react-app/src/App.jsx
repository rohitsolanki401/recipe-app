import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import ErrorPage from "./pages/Error.jsx";
import RecipesPage from "./pages/Recipes.jsx";
import RecipeDetailsPage from "./pages/RecipeDetails.jsx";
import NewRecipePage from "./pages/NewRecipe.jsx";
import Login from "./pages/Login.jsx";
import { ToastContainer,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const router = createBrowserRouter([
    {
    path: 'login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),    
    errorElement: <ErrorPage />, 
  },
  
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <RecipesPage />,
          children: [
            { 
              index: true, 
              element: (
                <div className="recipe-placeholder">
                  Select a recipe to view details
                </div>
              ) 
            },
            { 
              path: "recipe/:id", 
              element: <RecipeDetailsPage /> 
            }
          ]
        },
        { path: "new-recipe", element: <NewRecipePage /> }
      ],
    }
    
  ]);

  return <>
   <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        transition={Bounce}
        style={{
          fontSize: '16px',
          '--toastify-font-family': 'Nunito Sans, sans-serif'
        }}
      />
  <RouterProvider router={router} />
  </>
};

export default App;