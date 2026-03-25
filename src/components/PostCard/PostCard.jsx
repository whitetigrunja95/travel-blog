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

const getPostLocation = (post) => {
  const country = post.country?.trim();
  const city = post.city?.trim();

  if (country && city) {
    return `${country}, ${city}`;
  }

  if (country) {
    return country;
  }

  if (city) {
    return city;
  }

  return "";
};

export const PostCard = ({ post }) => {
  const imageSrc = getPostImage(post.photo);
  const location = getPostLocation(post);

  return (
    <article className="post-card">
      <Link className="post-card__image-link" to={`/posts/${post.id}`}>
        <img className="post-card__image" src={imageSrc} alt={post.title} />
      </Link>

      <div className="post-card__body">
        <div className="post-card__content">
          <h2 className="post-card__title">
            <Link className="post-card__title-link" to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </h2>

          <p className="post-card__excerpt">{post.excerpt}</p>
        </div>

        <div className="post-card__footer">
          {location && <p className="post-card__location">{location}</p>}

          <Link className="post-card__more" to={`/posts/${post.id}`}>
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
};