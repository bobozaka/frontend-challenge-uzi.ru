import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../Redux/Silce/catsSlice';
import Catatetka from '../components/Catatetka';

const Favorites = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPage('favorites'));
  }, []);

  return <Catatetka isHome={false} />;
};

export default Favorites;
