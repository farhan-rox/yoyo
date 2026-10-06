import { useState } from "react";
import CategoryCard from "../components/CategoryCard";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setHasLoaded(true);
    setError("");

    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php",
      );
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error(err);
      setError("Could not load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={hasLoaded ? "page-section" : "empty-home"}>
      {!hasLoaded && (
        <button className="primary-button large-button" onClick={fetchCategories}>
          Load Categories
        </button>
      )}

      {loading && (
        <div className="center-state">
          <div className="spinner" aria-label="Loading categories"></div>
          <p>Loading categories...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {hasLoaded && !loading && !error && (
        <>
          <h1 className="page-title">Meal Categories</h1>
          <div className="card-grid">
            {categories.map((cat) => (
              <CategoryCard category={cat} key={cat.idCategory} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CategoriesPage;
