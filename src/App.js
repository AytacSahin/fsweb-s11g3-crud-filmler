import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useAxios, { REQ_TYPES } from "./hooks/useAxios";

import Movie from './components/Movie';
import MovieList from './components/MovieList';
import MovieHeader from './components/MovieHeader';
import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from "./components/AddMovieForm";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [deleteMov] = useAxios();
  const [getData] = useAxios();
  const { push } = useHistory();
 
  useEffect(() => {
    getData({
      endpoint: `/movies`,
      reqType: REQ_TYPES.GET,
    }).then((res) => {
      setMovies(res);
    })
  }, []);

  const deleteMovie = (id) => {
    deleteMov({
      endpoint: `/movies/${id}`,
      reqType: REQ_TYPES.DELETE,
    }).then((res) => {
      setMovies(res);
      push(`/movies`)
    })
  }

  const addToFavorites = (movie) => {
    favoriteMovies.filter(item => item.id === movie.id).length == 0 ? setFavoriteMovies([...favoriteMovies, movie]) : setFavoriteMovies(favoriteMovies)
  }

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>

        </div>
      </div>
    </div>
  );
};

export default App;

