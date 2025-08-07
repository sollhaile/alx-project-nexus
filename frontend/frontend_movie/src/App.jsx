import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './auth/Login';
import MovieList from './pages/MovieList';
import Register from './auth/Register';

import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/register" element={<Register />} />

      </Route>
    </Routes>
  );
}

export default App;