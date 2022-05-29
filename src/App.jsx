import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCats, setFavorites } from './Redux/Silce/catsSlice';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Favorite from './page/Favorite';
import Home from './page/Home';
import './scss/app.scss';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/images/search?limit=15&size=small&mime_types=jpg,png',
      headers: {
        '-x-api-key': '9da748eb-6934-4aa5-a6dd-cd68c4a7c583s',
      },
    }).then((data) => dispatch(setCats(data.data)));

    axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/favourites/',
      headers: {
        'x-api-key': '9da748eb-6934-4aa5-a6dd-cd68c4a7c583',
      },
    }).then((data) => dispatch(setFavorites(data.data)));
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
};

export default App;
