import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites(){
    const {favorites} = useMovieContext();

    if(favorites.length !== 0){
        console.log(favorites.length)
        return (
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                    {favorites.map( (movie) => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            </div>
        )
    } 

    return(
        <div className="favorites-empty">
            <h2>No Favorite Movie Yet</h2>
            <p>Start adding movies to yor favorites and they will appear here!</p>
        </div>
    )
    

};

export default Favorites;