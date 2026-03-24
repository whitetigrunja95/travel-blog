import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { PostCard } from "../../components/PostCard/PostCard";
import { getPosts } from "../../api/postsApi";
import { AppRoute } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import "./HomePage.css";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const data = await getPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Не удалось загрузить посты:",
          error.response?.data || error.message
        );
        setLoadError("Не удалось загрузить истории");
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="home-page">
      <section className="home-page__hero">
        <div className="home-page__hero-overlay" />
        <Header />

        <div className="home-page__hero-content">
          <h1 className="home-page__hero-title">
            ТАМ, ГДЕ МИР НАЧИНАЕТСЯ С ПУТЕШЕСТВИЙ
          </h1>
        </div>
      </section>

      <section className="home-page__content">
        <div className="home-page__container">
          {isLoading ? (
            <div className="home-page__state">Загрузка...</div>
          ) : loadError ? (
            <div className="home-page__state home-page__state--error">
              {loadError}
            </div>
          ) : posts.length === 0 ? (
            <div className="home-page__state">Пока нет историй</div>
          ) : (
            <div className="home-page__grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {isAuthenticated && (
            <div className="home-page__actions">
              <Link className="home-page__create-button" to={AppRoute.CREATE_POST}>
                Добавить моё путешествие
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};