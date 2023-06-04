import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  //укажите здесь prop-types для ингридиента
});

export const burgerConstPropTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  openModal: PropTypes.func.isRequired,
}