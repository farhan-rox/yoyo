import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MealDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await res.json();
        setMeal(data.meals?.[0] || null);
      } catch (err) {
        console.error(err);
        setError("Could not load meal details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) {
    return (
      <div className="center-state">
        <div className="spinner" aria-label="Loading meal details"></div>
        <p>Loading meal details...</p>
      </div>
    );
  }

  if (error) return <p className="error-message">{error}</p>;
  if (!meal) return <p className="error-message">Meal not found.</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
    }
  }

  return (
    <section className="page-section">
      <button onClick={() => navigate(-1)} className="secondary-button">
        Back
      </button>

      <article className="details-panel">
        <div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="meal-detail-image"
          />
        </div>

        <div className="details-content">
          <h1 className="details-title">{meal.strMeal}</h1>
          <div className="badge-row">
            <span className="badge">{meal.strCategory}</span>
            <span className="badge muted-badge">{meal.strArea}</span>
          </div>

          <h2>Ingredients</h2>
          <ul className="ingredient-list">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </article>

      <article className="instructions-panel">
        <h2>Instructions</h2>
        <p>{meal.strInstructions}</p>
      </article>
    </section>
  );
};

export default MealDetailsPage;
