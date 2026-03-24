import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { PostCard } from "../../components/PostCard/PostCard";
import { AppRoute } from "../../constants/routes";
import { mockPosts } from "../../utils/mockPosts";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <Layout title="Там, где мир начинается с путешествий">
      <section className="home-page">
        <div className="home-page__posts">
          <div className="home-page__posts-grid">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="home-page__top">
          <Link className="home-page__button" to={AppRoute.CREATE_POST}>
            Добавить моё путешествие
          </Link>
        </div>
      </section>
    </Layout>
  );
};