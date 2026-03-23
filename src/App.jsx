import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { PostPage } from "./pages/PostPage/PostPage";
import { CreatePostPage } from "./pages/CreatePostPage/CreatePostPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { AppRoute } from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={AppRoute.HOME} element={<HomePage />} />
          <Route path={AppRoute.LOGIN} element={<LoginPage />} />
          <Route path={AppRoute.REGISTER} element={<RegisterPage />} />
          <Route path={AppRoute.POST} element={<PostPage />} />
          <Route path={AppRoute.CREATE_POST} element={<CreatePostPage />} />
          <Route path={AppRoute.PROFILE} element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;