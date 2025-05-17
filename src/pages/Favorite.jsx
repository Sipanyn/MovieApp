import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/favorite.module.css";
import { addFav, removeFa } from "../features/MovieSlice";
function Favorite() {
  const dispatch = useDispatch();
  const favoriteArray = useSelector((state) => state.movie.favoriteArray);
  return (
    <div className={styles.favorite}>
      {favoriteArray.length > 0 ? (
        <ul>
          {favoriteArray.map((item) => (
            <div className={styles.movie} key={item.id}>
              <div className={styles.top}>
                {item.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    alt={item.title}
                  />
                ) : (
                  <img
                    src="/Final Cut Pro X New Sticker.jfif"
                    alt="No poster"
                  />
                )}
                <p className={styles.title}>{item.title}</p>
              </div>
              <div className={styles.bottom}>
                <div className={styles.rating}>
                  Rating:{" "}
                  {item.vote_average === 0 ||
                  item.vote_average === undefined ? (
                    <p className={styles.warning}>No data Available</p>
                  ) : (
                    <p>{item.vote_average.toFixed(1)}/10</p>
                  )}
                </div>
                <div className={styles.date}>
                  Release:
                  {item.release_date === "" ? (
                    <p className={styles.warning}>No data Available</p>
                  ) : (
                    item.release_date
                  )}
                </div>
                <span
                  onClick={() => dispatch(removeFa(item.id))}
                  className={styles.favIcon}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="red"
                      d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"
                      stroke-width="0.5"
                      stroke="#000"
                    />
                  </svg>
                </span>
              </div>
              <span className={styles.line}></span>
            </div>
          ))}
        </ul>
      ) : (
        <p className={styles.ntfound}>No favorites found</p>
      )}
    </div>
  );
}

export default Favorite;
