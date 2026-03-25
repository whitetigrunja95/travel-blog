import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { getPostById } from "../../api/postsApi";
import { createComment } from "../../api/commentsApi";
import "./PostPage.css";

const COMMENT_NAME_MAX_LENGTH = 255;
const COMMENT_TEXT_MAX_LENGTH = 600;

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ru-RU").format(date);
};

const getPostImage = (photo) => {
  if (!photo) {
    return "";
  }

  if (photo.startsWith("http") || photo.startsWith("data:image")) {
    return photo;
  }

  return `http://127.0.0.1:8000${photo}`;
};

export const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [commentData, setCommentData] = useState({
    fullName: "",
    comment: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    comment: "",
  });

  const commentLength = useMemo(
    () => commentData.comment.length,
    [commentData.comment]
  );

  const loadPost = async () => {
    try {
      setIsLoading(true);
      setLoadError("");

      const data = await getPostById(id);
      setPost(data);
    } catch (error) {
      console.error(
        "Не удалось загрузить пост:",
        error.response?.data || error.message
      );
      setLoadError("Не удалось загрузить историю");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    loadPost();
  }, [id]);

  const handleCommentChange = (event) => {
    const { name, value } = event.target;

    setCommentData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateCommentForm = () => {
    const nextErrors = {
      fullName: "",
      comment: "",
    };

    if (!commentData.fullName.trim()) {
      nextErrors.fullName = "Напишите имя";
    }

    if (!commentData.comment.trim()) {
      nextErrors.comment = "Добавьте текст отзыва";
    }

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateCommentForm();

    if (!isValid) {
      return;
    }

    try {
      await createComment(id, {
        fullName: commentData.fullName.trim(),
        comment: commentData.comment.trim(),
      });

      setIsSuccessModalOpen(true);
      await loadPost();
    } catch (error) {
      console.error(
        "Не удалось добавить отзыв:",
        error.response?.data || error.message
      );
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setIsCommentFormOpen(false);
    setCommentData({
      fullName: "",
      comment: "",
    });
    setErrors({
      fullName: "",
      comment: "",
    });
  };

  const imageSrc = getPostImage(post?.photo);

  if (isLoading) {
    return (
      <div className="post-page">
        <section className="post-page__hero">
          <div className="post-page__hero-overlay" />
          <Header />
          <div className="post-page__hero-content">
            <h1 className="post-page__hero-title">ИСТОРИИ ВАШИХ ПУТЕШЕСТВИЙ</h1>
          </div>
        </section>

        <section className="post-page__content">
          <div className="post-page__container">
            <div className="post-page__state">Загрузка...</div>
          </div>
        </section>
      </div>
    );
  }

  if (loadError || !post) {
    return (
      <div className="post-page">
        <section className="post-page__hero">
          <div className="post-page__hero-overlay" />
          <Header />
          <div className="post-page__hero-content">
            <h1 className="post-page__hero-title">ИСТОРИИ ВАШИХ ПУТЕШЕСТВИЙ</h1>
          </div>
        </section>

        <section className="post-page__content">
          <div className="post-page__container">
            <div className="post-page__state post-page__state--error">
              {loadError || "Пост не найден"}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="post-page">
      <section className="post-page__hero">
        <div className="post-page__hero-overlay" />
        <Header />

        <div className="post-page__hero-content">
          <h1 className="post-page__hero-title">ИСТОРИИ ВАШИХ ПУТЕШЕСТВИЙ</h1>
        </div>
      </section>

      <section className="post-page__content">
        <div className="post-page__container">
          {!isCommentFormOpen ? (
            <article className="post-page__card">
              {imageSrc ? (
                <img
                  className="post-page__image"
                  src={imageSrc}
                  alt={post.title}
                />
              ) : (
                <div className="post-page__image post-page__image--placeholder" />
              )}

              <div className="post-page__body">
                <h2 className="post-page__title">{post.title}</h2>

                <div className="post-page__description">
                  {post.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="post-page__comments">
                  {post.comments?.map((comment, index) => (
                    <div
                      className="post-page__comment"
                      key={`${comment.author_name}-${comment.created_at}-${index}`}
                    >
                      <p className="post-page__comment-name">
                        {comment.author_name}
                      </p>
                      <p className="post-page__comment-date">
                        {formatDate(comment.created_at)}
                      </p>
                      <p className="post-page__comment-text">
                        {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="post-page__actions">
                  <button
                    className="post-page__button post-page__button--secondary"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    <span className="post-page__button-arrow">←</span>
                    <span>Назад</span>
                  </button>

                  {isAuthenticated && (
                    <button
                      className="post-page__button post-page__button--primary"
                      type="button"
                      onClick={() => setIsCommentFormOpen(true)}
                    >
                      Ваше впечатление об этом месте
                    </button>
                  )}
                </div>
              </div>
            </article>
          ) : (
            <section className="post-page__review-card">
              <h2 className="post-page__review-title">Добавление отзыва</h2>

              <form
                className="post-page__review-form"
                onSubmit={handleCommentSubmit}
                noValidate
              >
                <div className="post-page__field">
                  <label className="post-page__label" htmlFor="comment-fullName">
                    <span className="post-page__required">*</span> Ваше имя
                  </label>

                  <input
                    id="comment-fullName"
                    className={`post-page__input ${
                      errors.fullName ? "post-page__input--error" : ""
                    }`}
                    type="text"
                    name="fullName"
                    placeholder="Ваше имя"
                    maxLength={COMMENT_NAME_MAX_LENGTH}
                    value={commentData.fullName}
                    onChange={handleCommentChange}
                  />

                  {errors.fullName && (
                    <p className="post-page__error">{errors.fullName}</p>
                  )}
                </div>

                <div className="post-page__field">
                  <label className="post-page__label" htmlFor="comment-comment">
                    <span className="post-page__required">*</span> Отзыв
                  </label>

                  <textarea
                    id="comment-comment"
                    className={`post-page__textarea ${
                      errors.comment ? "post-page__textarea--error" : ""
                    }`}
                    name="comment"
                    placeholder="Добавьте текст отзыва"
                    maxLength={COMMENT_TEXT_MAX_LENGTH}
                    value={commentData.comment}
                    onChange={handleCommentChange}
                  />

                  <div className="post-page__textarea-footer">
                    <div>
                      {errors.comment && (
                        <p className="post-page__error">{errors.comment}</p>
                      )}
                    </div>

                    <span className="post-page__counter">
                      {commentLength} / {COMMENT_TEXT_MAX_LENGTH}
                    </span>
                  </div>
                </div>

                <div className="post-page__actions">
                  <button
                    className="post-page__button post-page__button--secondary"
                    type="button"
                    onClick={() => {
                      setIsCommentFormOpen(false);
                      setErrors({ fullName: "", comment: "" });
                    }}
                  >
                    <span className="post-page__button-arrow">←</span>
                    <span>Назад</span>
                  </button>

                  <button
                    className="post-page__button post-page__button--primary"
                    type="submit"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </section>

      {isSuccessModalOpen && (
        <div
          className="post-page__success-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-success-title"
        >
          <div
            className="post-page__success-overlay"
            onClick={closeSuccessModal}
          />

          <div className="post-page__success-content">
            <button
              className="post-page__success-close"
              type="button"
              aria-label="Закрыть"
              onClick={closeSuccessModal}
            >
              ×
            </button>

            <h3 className="post-page__success-title" id="review-success-title">
              Ваш отзыв успешно добавлен
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};