


import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './auth/Login';
import MovieList from './pages/MovieList';
import Register from './auth/Register';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/movies" element={<MovieList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;


























/**import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './auth/Login';
import MovieList from './pages/MovieList';
import Register from './auth/Register';
import Home from './components/Home';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/movies" element={<MovieList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

      </Route>
    </Routes>
  );
}

export default App;* */