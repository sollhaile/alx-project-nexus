import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const response = await fetchMovieDetails(id);
      setMovie(response.data);
    };
    loadMovie();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      {movie && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img src={movie.poster_url} alt={movie.title} className="w-full h-auto" />
            </div>
            <div className="p-8 md:w-2/3">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="mt-4 text-gray-600">{movie.description}</p>
              {/* Add rating component here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};