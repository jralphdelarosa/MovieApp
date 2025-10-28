import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import CategoryDropdown from "../components/CategoryDropDown";
import { searchMovies, getPopularMovies, getMoviesByGenreMultiplePages, getMovieGenres } from "../services/api";
import '../css/Home.css'

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setSerror] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  // Load genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoading(true);
        const genreList = await getMovieGenres();
        setCategories(genreList);

        // Default: load popular movies
        const popular = await getPopularMovies();
        setMovies(popular);
        setSerror(null);
      } catch (err) {
        console.error(err);
        setSerror("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  // Handle category change
  const handleCategoryChange = async (categoryName) => {
    setSelectedCategory(categoryName);
    setLoading(true);

    try {
      if (categoryName === "Popular") {
        const popular = await getPopularMovies();
        setMovies(popular);
      } else {
        const genre = categories.find((g) => g.name === categoryName);
        if (genre) {
          const genreMovies = await getMoviesByGenreMultiplePages(genre.id, 5); // fetch 5 pages (~100 movies)
          setMovies(genreMovies);
        }
      }
      setSerror(null);
    } catch (err) {
      console.error(err);
      setSerror("Failed to load movies for this category");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setSerror(null);
    } catch (err) {
      console.error(err);
      setSerror("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Search form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies
              .filter((movie) =>
                movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;