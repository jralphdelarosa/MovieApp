const API_KEY = "a87c567f79e0c40056f90bf48f942d28";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();

    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    
    const data = await response.json();

    return data.results;
};

export const getMoviesByGenreMultiplePages = async (genreId, totalPages = 5) => {
  const allMoviesByGenre = [];

  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=release_date.desc&page=${page}`
    );
    const data = await response.json();
    if (data.results) allMoviesByGenre.push(...data.results);
  }

  return allMoviesByGenre;
};

export const getMovieGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.genres || []; // returns an array of {id, name}
  } catch (err) {
    console.error("Failed to fetch genres:", err);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data;
};

export const getMovieVideos = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data.results || [];
};
