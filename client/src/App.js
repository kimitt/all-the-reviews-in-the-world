import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import PersistLogin from "./components/PersistLogin";
import AuthMiddleware from "./middleware/Auth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import User from "./pages/auth/User";
import { Provider } from "react-redux";
import store from "./store/store";
import Blog from "./pages/blog/Blog";
import BlogPost from "./pages/blog/BlogPost";
import BlogCategory from "./pages/blog/category/BlogCategory";
import BlogCreate from "./components/blog/BlogCreate";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<PersistLogin />}>
            <Route index exact element={<Home />}></Route>
            <Route path="/auth">
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="user" element={<AuthMiddleware />}>
                <Route index element={<User />}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/post/:slug" element={<BlogPost />} />
          <Route
            path="/blog/categories/:category_id"
            element={<BlogCategory />}
          />
          <Route path="/blog/create" element={<BlogCreate />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
