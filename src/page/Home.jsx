import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../Redux/Silce/catsSlice';
import Catatetka from '../components/Catatetka';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('home'));
  }, []);

  return (
    <>
      <Catatetka isHome={true} />
    </>
  );
};

export default Home;
