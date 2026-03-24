import { Link } from "react-router-dom";
import "./PostCard.css";

const getPostImage = (photo) => {
  if (!photo) {
    return "";
  }

  if (photo.startsWith("http")) {
    return photo;
  }

  return `http://localhost:8000${photo}`;
};

export const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <Link className="post-card__image-link" to={`/posts/${post.id}`}>
        <img
          className="post-card__image"
          src={getPostImage(post.photo)}
          alt={post.title}
        />
      </Link>

      <div className="post-card__body">
        <h2 className="post-card__title">
          <Link className="post-card__title-link" to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </h2>

        <p className="post-card__excerpt">{post.excerpt}</p>

        <Link className="post-card__more" to={`/posts/${post.id}`}>
          Подробнее
        </Link>
      </div>
    </article>
  );
};