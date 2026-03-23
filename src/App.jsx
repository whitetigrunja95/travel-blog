import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoute } from "./constants/routes";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { PostPage } from "./pages/PostPage/PostPage";
import { CreatePostPage } from "./pages/CreatePostPage/CreatePostPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.HOME} element={<HomePage />} />
        <Route path={AppRoute.LOGIN} element={<LoginPage />} />
        <Route path={AppRoute.REGISTER} element={<RegisterPage />} />
        <Route path={AppRoute.POST} element={<PostPage />} />
        <Route path={AppRoute.CREATE_POST} element={<CreatePostPage />} />
        <Route path={AppRoute.PROFILE} element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;