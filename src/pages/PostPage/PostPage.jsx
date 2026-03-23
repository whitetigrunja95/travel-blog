import { CommentCard } from "../../components/CommentCard/CommentCard";
import { mockPostDetails } from "../../utils/mockPostDetails";
import "./PostPage.css";

export const PostPage = () => {
  const { title, description, country, city, image, author, comments } =
    mockPostDetails;

  return (
    <section className="post-page">
      <div className="post-page__hero">
        <div className="post-page__image-wrapper">
          <img className="post-page__image" src={image} alt={title} />
        </div>

        <div className="post-page__content">
          <div className="post-page__location">
            <span className="post-page__country">{country}</span>
            <span className="post-page__dot">•</span>
            <span className="post-page__city">{city}</span>
          </div>

          <h1 className="post-page__title">{title}</h1>

          <div className="post-page__description">
            {description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="post-page__bottom">
        <aside className="post-page__author author-card">
          <h2 className="author-card__title">Автор истории</h2>

          <div className="author-card__top">
            <img
              className="author-card__avatar"
              src={author.avatar}
              alt={author.fullName}
            />

            <div className="author-card__info">
              <h3 className="author-card__name">{author.fullName}</h3>
              <p className="author-card__city">{author.city}</p>
            </div>
          </div>

          <p className="author-card__description">{author.description}</p>
        </aside>

        <div className="post-page__comments comments-section">
          <div className="comments-section__header">
            <div>
              <h2 className="comments-section__title">Отзывы</h2>
              <p className="comments-section__subtitle">
                Впечатления путешественников об этом месте
              </p>
            </div>

            <button className="comments-section__button" type="button">
              Ваше впечатление об этом месте
            </button>
          </div>

          <div className="comments-section__list">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};