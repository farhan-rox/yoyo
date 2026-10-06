import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MealCard from "../components/MealCard";

const MealsByCategoryPage = () => {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error(err);
        setError("Could not load meals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="center-state">
        <div className="spinner" aria-label="Loading meals"></div>
        <p>Loading meals...</p>
      </div>
    );
  }

  return (
    <section className="page-section">
      <Link to="/" className="secondary-button">
        Back to Categories
      </Link>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <h1 className="page-title">Meals in {categoryName}</h1>
          <div className="card-grid">
            {meals.map((meal) => (
              <MealCard meal={meal} key={meal.idMeal} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MealsByCategoryPage;
