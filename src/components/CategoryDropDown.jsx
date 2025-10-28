import "../css/CategoryDropdown.css";

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-dropdown">
      <button className="dropdown-button">
        {selectedCategory} <span className="arrow">&#9662;</span>
      </button>
      <ul className="dropdown-menu">
        <li
          className={selectedCategory === "Popular" ? "active" : ""}
          onClick={() => onCategoryChange("Popular")}
        >
          Popular
        </li>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={selectedCategory === cat.name ? "active" : ""}
            onClick={() => onCategoryChange(cat.name)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
