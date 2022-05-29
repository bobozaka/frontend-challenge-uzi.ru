import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorites } from '../../Redux/Silce/catsSlice.js';
import styles from './CartBlock.module.scss';

const CatBlock = ({ url, id, isHome, image, image_id }) => {
  const { favorites } = useSelector((state) => state);
  const isFavorite = favorites.find((i) => i.image_id === id || image_id);
  const dispatch = useDispatch();

  const changeFavs = () => {
    axios({
      method: 'GET',
      url: `https://api.thecatapi.com/v1/favourites/`,
      headers: {
        'x-api-key': '9da748eb-6934-4aa5-a6dd-cd68c4a7c583',
      },
    }).then((data) => dispatch(setFavorites(data.data)));
  };

  const addToFav = (e) => {
    const block = e.target.closest(`.${styles.item}`);

    const btn = e.target.closest(`.${styles.heart}`),
      emptyHeart = btn.querySelector('.empty'),
      fullHeart = btn.querySelector('.full');

    if (emptyHeart.classList.contains(styles.active)) {
      emptyHeart.classList.remove(styles.active);
      fullHeart.classList.add(styles.active);

      axios({
        method: 'POST',
        url: `https://api.thecatapi.com/v1/favourites/`,
        headers: {
          'x-api-key': '9da748eb-6934-4aa5-a6dd-cd68c4a7c583',
        },
        data: {
          image_id: id,
          sub_id: '123',
        },
      })
        .then(() => changeFavs())
        .catch((error) => {
          console.log(error);
        });
    } else {
      emptyHeart.classList.add(styles.active);
      fullHeart.classList.remove(styles.active);
      !isHome && block.remove();

      axios({
        method: 'GET',
        url: 'https://api.thecatapi.com/v1/favourites',
        headers: {
          'x-api-key': '9da748eb-6934-4aa5-a6dd-cd68c4a7c583',
        },
      })
        .then((data) => {
          data.data.forEach((item) => {
            if (item.id === id) {
              axios({
                method: 'DELETE',
                url: `https://api.thecatapi.com/v1/favourites/${item.id}`,
                headers: {
                  'x-api-key': '9da748eb-6934-4aa5-a6dd-cd68c4a7c583',
                },
              }).then(() => changeFavs());
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.item}>
      <img className={styles.cat__img} src={isHome ? url : image.url} alt="cat" />
      <button className={styles.heart} onClick={addToFav}>
        <img
          src={require('../img/favorite-liked.svg').default}
          alt="favorite-liked"
          className={isFavorite ? 'empty' : styles.active + ' empty'}
        />
        <img
          src={require('../img/favorite-unliked.svg').default}
          alt="favorite-unliked"
          className={isFavorite ? styles.active + ' full' : 'full'}
        />
      </button>
    </div>
  );
};
export default CatBlock;
