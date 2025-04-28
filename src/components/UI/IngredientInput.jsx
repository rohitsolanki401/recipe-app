import classes from "./IngredientInput.module.scss";

const IngredientInput = ({
  index,
  ingredient,
  onIngredientChange,
  onRemoveIngredient,
}) => {
  const inputChangeHandler = (event) => {
    const { id, value } = event.target;

    onIngredientChange({ ...ingredient, [id]: value });
  };

  const removeIngredientHandler = () => {
    onRemoveIngredient(index);
  };

  return (
    <div className={classes.input}>
      <h3>Ingredient {index + 1}</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{ width: "22%" }}
          id="quantity"
          type="number"
          className={classes.input__quantity}
          placeholder="Quantity"
          value={ingredient.quantity}
          onChange={inputChangeHandler}
        />
        <input
          style={{ width: "22%" }}
          id="unit"
          type="text"
          className={classes.input__unit}
          placeholder="Unit"
          value={ingredient.unit}
          onChange={inputChangeHandler}
        />
        <input
          style={{ width: "44%" }}
          id="description"
          type="text"
          className={classes.input__description}
          placeholder="Description"
          value={ingredient.description}
          onChange={inputChangeHandler}
        />
        <button
          className={classes["btn--close-modal"]}
          type="button"
          onClick={removeIngredientHandler}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;
