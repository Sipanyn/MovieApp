import { NavLink, Outlet } from "react-router";
import styles from "../styles/applayout.module.css";
import { useSelector } from "react-redux";
function AppLayout() {
  const selectedTrending = useSelector((state) => state.movie.selectedTrending);
  return (
    <div
      className={styles.main}
      style={
        selectedTrending != null && selectedTrending?.backdrop_path != null
          ? {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${selectedTrending.backdrop_path})`,
            }
          : {
              backgroundImage: 'url("/MovieApp/download.jfif")',
            }
      }
    >
      <div className={styles.header}>
        <NavLink to="/">
          {" "}
          <span className={styles.logo}>
            Agency{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M18.001 20H20v2h-8C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.99 9.99 0 0 1-3.999 8M12 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-4 4a2 2 0 1 0 0-4a2 2 0 0 0 0 4m8 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-4 4a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
              />
            </svg>
          </span>
        </NavLink>
        <ul className={styles.links}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/favorite">Favorite</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
