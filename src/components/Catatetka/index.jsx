import { useSelector } from 'react-redux';
import CatBlock from '../CatBlock';
import styles from './Catatetka.module.scss';

const Catatetka = ({ isHome }) => {
  const { cats, favorites } = useSelector((state) => state);

  return (
    <div className={styles.content}>
      <div className="container">
        <div className={styles.wrapper}>
          {isHome
            ? cats.map((cat, index) => {
                return <CatBlock key={index} {...cat} isHome={true} />;
              })
            : favorites.map((cat, index) => {
                return <CatBlock key={index} {...cat} isHome={false} />;
              })}
        </div>

        <p className={styles.text}>... загружаем еще котиков ...</p>
      </div>
    </div>
  );
};

export default Catatetka;
