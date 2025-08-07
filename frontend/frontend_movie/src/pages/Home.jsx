import React, { useEffect, useState } from 'react';
import client from '../api/client';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await client.get('/api/movies/');
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movie List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {movies.map(movie => (
            <div key={movie.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p>{movie.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;