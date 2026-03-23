import { Link } from "react-router-dom";
import "./PostCard.css";

export const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <Link className="post-card__image-link" to={`/posts/${post.id}`}>
        <img
          className="post-card__image"
          src={post.image}
          alt={post.title}
        />
      </Link>

      <div className="post-card__content">
        <div className="post-card__location">
          <span className="post-card__country">{post.country}</span>
          <span className="post-card__dot">•</span>
          <span className="post-card__city">{post.city}</span>
        </div>

        <Link className="post-card__title-link" to={`/posts/${post.id}`}>
          <h2 className="post-card__title">{post.title}</h2>
        </Link>

        <p className="post-card__description">{post.description}</p>

        <Link className="post-card__more" to={`/posts/${post.id}`}>
          Читать историю
        </Link>
      </div>
    </article>
  );
};