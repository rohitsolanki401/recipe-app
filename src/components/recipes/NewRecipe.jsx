import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { sendData } from "../../store/recipe-actions";

import LoadingSpinner from "../UI/LoadingSpinner";
import Notification from "../UI/Notification";
import IngredientInput from "../UI/IngredientInput";
import Input from "../UI/Input";

import Icons from "../../assets/images/icons.svg";

import classes from "./NewRecipe.module.scss";

const NewRecipe = () => {
  const initialIngredientState = { quantity: 0, unit: "", description: "" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [ingredientsList, setIngredientsList] = useState([
    initialIngredientState,
  ]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const crtRecipe = useSelector((state) => state.recipe.recipe);

  const addIngredientHandler = () => {
    if (ingredientsList.length < 6) {
      setIngredientsList([...ingredientsList, initialIngredientState]);
    }
  };

  const removeIngredientHandler = (index) => {
    const updatedIngredients = [...ingredientsList];
    updatedIngredients.splice(index, 1);
    setIngredientsList(updatedIngredients);
  };

  const inputChangeHandler = (index, updatedIngredient) => {
    const updatedIngredients = [...ingredientsList];
    updatedIngredients[index] = updatedIngredient;
    setIngredientsList(updatedIngredients);
  };

  const closeModalHandler = () => {
    if (Object.keys(crtRecipe).length !== 0) {
      navigate(`../${crtRecipe.id}`);
    } else {
      navigate("..");
    }
  };

  const formSubmitHandler = (data) => {
    const newRecipe = {
      title: data.title,
      source_url: data.source_url,
      image_url: data.image_url,
      publisher: data.publisher,
      cooking_time: +data.cooking_time,
      servings: data.servings,
      ingredients: ingredientsList,
    };

    dispatch(sendData(newRecipe));

    setTimeout(() => {
      navigate(`../${crtRecipe.id}`);
    }, 2000);
  };

  return (
    <div className={classes["add-recipe-window"]}>
      <button
        className={classes["btn--close-modal"]}
        type="button"
        onClick={closeModalHandler}
      >
        &times;
      </button>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form
          className={classes.upload}
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <div className={classes.upload__column}>
            <h3 className={classes.upload__heading}>Recipe data</h3>

            <Input
              className={`${classes.upload__input} ${
                errors.title ? classes.invalid : null
              }`}
              label="Title"
              type="text"
              name="title"
              register={register}
              errors={errors}
              message="This field is required"
            />

            <Input
              className={`${classes.upload__input} ${
                errors.source_url ? classes.invalid : null
              }`}
              label="URL"
              type="text"
              name="source_url"
              register={register}
              isUrl={true}
              errors={errors}
              message="This field is required"
            />

            <Input
              className={`${classes.upload__input} ${
                errors.image_url ? classes.invalid : null
              }`}
              label="Image URL"
              type="text"
              name="image_url"
              register={register}
              isUrl={true}
              errors={errors}
              message="This field is required"
            />

            <Input
              className={`${classes.upload__input} ${
                errors.publisher ? classes.invalid : null
              }`}
              label="Publisher"
              type="text"
              name="publisher"
              register={register}
              errors={errors}
              message="This field is required"
            />

            <Input
              className={`${classes.upload__input} ${
                errors.cooking_time ? classes.invalid : null
              }`}
              label="Prep time"
              type="number"
              name="cooking_time"
              register={register}
              errors={errors}
              message="This field is required"
            />

            <Input
              className={`${classes.upload__input} ${
                errors.servings ? classes.invalid : null
              }`}
              label="Servings"
              type="number"
              name="servings"
              register={register}
              errors={errors}
              message="This field is required"
            />
          </div>

          <div className={classes.upload__column}>
            <h3 className={classes.upload__heading}>Ingredients</h3>

            <div
              style={{
                gridColumnStart: 1,
                gridColumnEnd: 3,
              }}
            >
              {ingredientsList.map((ingr, index) => (
                <IngredientInput
                  key={`ingredient${index}`}
                  index={index}
                  ingredient={ingr}
                  onIngredientChange={(updatedIngredient) =>
                    inputChangeHandler(index, updatedIngredient)
                  }
                  onRemoveIngredient={removeIngredientHandler}
                />
              ))}
              {ingredientsList.length < 6 && (
                <button
                  className={`${classes.btn} ${classes.upload__btn}`}
                  type="button"
                  onClick={addIngredientHandler}
                >
                  <svg>
                    <use href={`${Icons}#icon-upload-cloud`}></use>
                  </svg>
                  <span>Add new ingredient</span>
                </button>
              )}
            </div>
          </div>

          <button
            className={`${classes.btn} ${classes.upload__btn}`}
            type="submit"
          >
            <svg>
              <use href={`${Icons}#icon-upload-cloud`}></use>
            </svg>
            <span>Upload</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default NewRecipe;
