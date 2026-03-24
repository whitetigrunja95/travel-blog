import { Link } from "react-router-dom";
import "./PostCard.css";

const getPostImage = (photo) => {
  if (!photo) {
    return "";
  }

  if (photo.startsWith("http") || photo.startsWith("data:image")) {
    return photo;
  }

  return `http://127.0.0.1:8000${photo}`;
};

export const PostCard = ({ post }) => {
  const imageSrc = getPostImage(post.photo);

  return (
    <article className="post-card">
      <Link className="post-card__image-link" to={`/posts/${post.id}`}>
        {imageSrc ? (
          <img
            className="post-card__image"
            src={imageSrc}
            alt={post.title}
          />
        ) : (
          <div className="post-card__image post-card__image--placeholder" />
        )}
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