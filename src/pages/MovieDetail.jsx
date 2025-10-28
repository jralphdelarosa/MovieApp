import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../services/api";
import "../css/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const details = await getMovieDetails(id);
        const videos = await getMovieVideos(id);
        const trailerVideo = videos.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setMovie(details);
        setTrailer(trailerVideo);
      } catch (error) {
        console.error("Failed to load movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error-message">Movie not found.</div>;

  return (
    <div className="movie-detail">
      <Link to="/" className="back-button">← Back</Link>

      <div className="movie-header">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="release-date">📅 {movie.release_date}</p>
          <p className="rating">⭐ {movie.vote_average.toFixed(1)} / 10</p>
          <p className="overview">{movie.overview}</p>
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="trailer-button"
            >
              ▶ Watch Trailer
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;