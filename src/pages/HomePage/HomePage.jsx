import { Link } from "react-router-dom";
import { PostCard } from "../../components/PostCard/PostCard";
import { AppRoute } from "../../constants/routes";
import { mockPosts } from "../../utils/mockPosts";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <section className="home-page">
      <div className="home-page__hero">
        <div className="home-page__hero-content">
          <span className="home-page__subtitle">TravelBlog</span>
          <h1 className="home-page__title">
            Там, где мир начинается с путешествий
          </h1>
          <p className="home-page__description">
            Делись впечатлениями о странах, городах, улицах, людях и местах,
            которые остались в сердце. Находи истории других путешественников и
            вдохновляйся на новые маршруты.
          </p>

          <Link className="home-page__button" to={AppRoute.CREATE_POST}>
            Добавить моё путешествие
          </Link>
        </div>
      </div>

      <div className="home-page__posts">
        <div className="home-page__posts-header">
          <h2 className="home-page__posts-title">Истории путешествий</h2>
          <p className="home-page__posts-text">
            Подборка вдохновляющих заметок от путешественников
          </p>
        </div>

        <div className="home-page__posts-grid">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};