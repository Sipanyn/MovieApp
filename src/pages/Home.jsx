import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import styles from "../styles/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFav, fetchTrending, selectT } from "../features/MovieSlice";
function Home() {
  ///useState
  // const [selectedMovie, setSelectedMovie] = useState(null);
  ///store and reducer
  const trendingArray = useSelector((state) => state.movie.trendingArray);
  const selectedTrending = useSelector((state) => state.movie.selectedTrending);
  const favoriteArray = useSelector((state) => state.movie.favoriteArray);

  const dispatch = useDispatch();
  ///useEffect
  useEffect(() => {
    dispatch(fetchTrending());
  });
  ///functions
  function selectMovieHandler(id) {
    {
      trendingArray.map((item) => {
        if (item.id === id) {
          dispatch(selectT(item));
        }
      });
    }
  }
  // Find if the selectedTrending movie is in the favoriteArray or trendingArray with favorite flag
  const isFavorite =
    (selectedTrending &&
      (favoriteArray.some((fav) => fav.id === selectedTrending.id) ||
        trendingArray.some(
          (item) => item.id === selectedTrending.id && item.favorite
        ))) ||
    false;

  return (
    <div className={styles.home}>
      {selectedTrending !== null && (
        <>
          <div className={styles.aboutMovie}>
            <h1 className={styles.title}>{selectedTrending.title}</h1>
            <p className={styles.overview}>{selectedTrending.overview}</p>
            <div className={styles.bottom}>
              <p className={styles.vote_average}>
                Rating:{selectedTrending.vote_average.toFixed(1)}/10
              </p>
              <span
                onClick={() => dispatch(addFav(selectedTrending))}
                className={styles.favorite}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill={isFavorite ? "red" : "white"}
                    d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"
                    stroke-width="0.5"
                    stroke="#000"
                  />
                </svg>
              </span>
            </div>
          </div>
        </>
      )}

      <div className={styles.slider}>
        {trendingArray.length > 0 && (
          <>
            <Swiper
              spaceBetween={2}
              slidesPerView={1}
              breakpoints={{
                800: {
                  spaceBetween: 10,
                  slidesPerView: 2,
                },
                1000: {
                  spaceBetween: 10,
                  slidesPerView: 3,
                },
                1024: {
                  spaceBetween: 30,
                  slidesPerView: 3,
                },
              }}
              modules={[Navigation, Autoplay]}
              navigation={true}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {trendingArray.map((item) => {
                return (
                  <SwiperSlide>
                    <img
                      onClick={() => selectMovieHandler(item.id)}
                      src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    />
                    <p>{item.title}</p>
                  </SwiperSlide>
                );
              })}
              <h1>Trending Of Week</h1>
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
