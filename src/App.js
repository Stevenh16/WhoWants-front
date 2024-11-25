import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Home from './pages/home.js';
import SearchResults from "./pages/searchResults.js";
import Profile from "./pages/profile.js";

const router = createBrowserRouter(
  [
    {path: "/", element: <Login/>},
    {path: "/login", element: <Login />},
    {path: "/signup", element: <Signup/>},
    {path: '/home', element: <Home/>},
    {path: '/search', element: <SearchResults/>},
    {path: '/me', element: <Profile/>}
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <RouterProvider router = {router}/>
  );
}

export default App;
