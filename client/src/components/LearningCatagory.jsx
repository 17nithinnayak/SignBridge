import React, { useState, useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

// Example sub-concepts
const subConceptsData = {
  Greetings: ["Hello", "Good Morning", "Good Night", "Goodbye"],
  Numbers: ["1-5", "6-10", "11-20"],
  Colours: ["Red", "Blue", "Green"],
  Family: ["Mother", "Father", "Siblings"],
};

function CategoryPage() {
  const { category } = useParams();
  const [subConcepts, setSubConcepts] = useState([]);

  useEffect(() => {
    setSubConcepts(subConceptsData[category] || []);
  }, [category]);

  return (
    <div className="flex h-full">
      {/* Left - Subconcepts */}
      <div className="w-1/4 p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">{category}</h2>
        <ul className="space-y-2">
          {subConcepts.map((sub, i) => (
            <li key={i}>
              <Link
                to={`/category/${category}/${sub}`}
                className="block p-2 rounded hover:bg-teal-100 transition"
              >
                {sub}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right - LearningModule */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default CategoryPage;
