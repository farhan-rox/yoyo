import { Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import MealsByCategoryPage from "./pages/MealsByCategoryPage";
import MealDetailsPage from "./pages/MealDetailsPage";

function App() {
  return (
    <main className="app-shell">
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route
          path="/category/:categoryName"
          element={<MealsByCategoryPage />}
        />
        <Route path="/meal/:id" element={<MealDetailsPage />} />
      </Routes>
    </main>
  );
}

export default App;
