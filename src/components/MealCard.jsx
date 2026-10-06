import { Link } from "react-router-dom";

const MealCard = ({ meal }) => {
  return (
    <article className="food-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
      <h2 className="card-title">{meal.strMeal}</h2>
      <Link to={`/meal/${meal.idMeal}`} className="primary-button success-button">
        View Details
      </Link>
    </article>
  );
};

export default MealCard;
