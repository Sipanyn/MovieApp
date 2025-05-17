import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Search from "./pages/Search";
//layout routing
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "search", element: <Search /> },
        { path: "favorite", element: <Favorite /> },
      ],
    },
  ],
  { basename: "/MovieApp" }
);
function App() {
  return (
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
