import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App container">
      <MealSearch />
    </div>
  );
}

function MealSearch() {
  // State
  const [meals, setMeals] = useState([]);
  const [value, setValue] = useState("");

  const handleClick = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  };

  return (
    <div>
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center mt-4 text-main">Food Panda</h2>
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Food"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="btn bg-main text-white"
            type="button"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </div>

      <div className="food-container mt-5 row g-4">
        {meals.map((meal) => (
          <Food key={meal.idMeal} {...meal} />
        ))}
      </div>
    </div>
  );
}

function Food({ strArea, strMealThumb, strMeal, strCategory }) {
  return (
    <div className="col-md-4">
      <div className="card shadow h-100">
        <img src={strMealThumb} alt="meal" className="mb-3" />
        <div className="meal-info p-3">
          <h4 className="text-main mb-3">{strMeal}</h4>
          <p className="mb-3">Origin: {strArea}</p>
          <p className="mb-3">Category: {strCategory}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
