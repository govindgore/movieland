import React, { useEffect, useState } from 'react'
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL ="http://www.omdbapi.com?apikey=5c3c47a5";
/*for checking one example
const movie = {
    "Title": "Superman, Spiderman or Batman",
    "Year": "2011",
    "imdbID": "tt2084949",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
}*/
export default function App() {

    const [Movies, setMovies] = useState([]);
    const [search, setsearch] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL} &s=${title}`);
        const data = await response.json();//converts data to json form
        setMovies(data.Search);//search is predefined func and it is passed to setMovies
    }
    //it sends spiderman to searchmovies func whenever app is reloaded
    useEffect(() => {
        searchMovies('batman')
    }, [])
    return (
        <div className='app'>
            <h1>Movies Land</h1>

            <div className='search'>
                <input type="text"
                    placeholder='search for movie'
                    value={search}
                    onChange={(e) => setsearch(e.target.value)} />

                <img src={searchIcon} 
                    alt="search"
                    onClick={() => searchMovies(search)} />
            </div>
            {
                Movies.length > 0
                    ?
                    (
                        <div className='container'>
                            {Movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}


                        </div>
                    )
                    :
                    (<div className='empty'>
                        <h2>No Movies Found</h2>
                    </div>
                    )

            }

        </div>
    )
}
//5c3c47a5