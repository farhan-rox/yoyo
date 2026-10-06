import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <article className="food-card">
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="category-image"
      />
      <h2 className="card-title">{category.strCategory}</h2>
      <Link to={`/category/${category.strCategory}`} className="primary-button">
        View Meals
      </Link>
    </article>
  );
};

export default CategoryCard;
