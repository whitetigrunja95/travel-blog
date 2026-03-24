import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import "./PostPage.css";

const COMMENT_NAME_MAX_LENGTH = 255;
const COMMENT_TEXT_MAX_LENGTH = 600;

const mockPost = {
  title: "Фуншал. Расслабленный и броский",
  description: `Столичные города всегда полны достопримечательностей, даже если это маленькая столица совсем небольшого острова.
Не всегда хватает времени, чтобы увидеть всё интересное, но даже то, что успели, трудно уместить в один рассказ.

Кое о чём я написала ранее: о катании на тобогане и канатной дороге, о красочном рынке Фуншала, о магнолиях в городском саду и о восхитительном парке на горе Монте Паас. Всё это основные развлечения из разряда «маст-ту-си», но в городе ещё много туристических локаций и атмосферных мест.`,
  image: "/post-image.jpg",
  user: {
    full_name: "Алексей",
    city: "Москва",
    description:
      "Люблю атмосферные города, необычную архитектуру и долгие прогулки без маршрута.",
  },
  comments: [
    {
      id: 1,
      name: "Алексей",
      created_at: "22.12.2023",
      text: "Интересный городок, узоры брусчатки, разрисованные двери, ранчо из плитки — всё это создаёт особый шарм.",
    },
    {
      id: 2,
      name: "Ольга",
      created_at: "22.12.2023",
      text: "Португальские черты, конечно, угадываются легко. Можно не читать текст, но по фото понять, о какой стране идёт речь.",
    },
    {
      id: 3,
      name: "Ксения",
      created_at: "22.12.2023",
      text: "Игров, в футболе и игроках разбираюсь на уровне “zero”, и памятник мне совсем не понравился.",
    },
    {
      id: 4,
      name: "Олеся",
      created_at: "22.12.2023",
      text: "Очень типичный, узнаваемо португальский!",
    },
    {
      id: 5,
      name: "Иван",
      created_at: "22.12.2023",
      text: "Квартал разрисованных дверей — интересное место! И как украшает улицы!",
    },
  ],
};

export const PostPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [commentData, setCommentData] = useState({
    name: "",
    text: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    text: "",
  });

  const commentLength = useMemo(
    () => commentData.text.length,
    [commentData.text]
  );

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
      name: "",
      text: "",
    };

    if (!commentData.name.trim()) {
      nextErrors.name = "Напишите имя";
    }

    if (!commentData.text.trim()) {
      nextErrors.text = "Добавьте текст отзыва";
    }

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    const isValid = validateCommentForm();

    if (!isValid) {
      return;
    }

    console.log("Отзыв готов к отправке:", commentData);

    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setIsCommentFormOpen(false);
    setCommentData({
      name: "",
      text: "",
    });
    setErrors({
      name: "",
      text: "",
    });
  };

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
              <img
                className="post-page__image"
                src={mockPost.image}
                alt={mockPost.title}
              />

              <div className="post-page__body">
                <h2 className="post-page__title">{mockPost.title}</h2>

                <div className="post-page__description">
                  {mockPost.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="post-page__author">
                  <h3 className="post-page__author-name">
                    {mockPost.user.full_name}
                  </h3>
                  <p className="post-page__author-city">{mockPost.user.city}</p>
                  <p className="post-page__author-description">
                    {mockPost.user.description}
                  </p>
                </div>

                <div className="post-page__comments">
                  {mockPost.comments.map((comment) => (
                    <div className="post-page__comment" key={comment.id}>
                      <p className="post-page__comment-name">{comment.name}</p>
                      <p className="post-page__comment-date">
                        {comment.created_at}
                      </p>
                      <p className="post-page__comment-text">{comment.text}</p>
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
                  <label className="post-page__label" htmlFor="comment-name">
                    <span className="post-page__required">*</span> Ваше имя
                  </label>

                  <input
                    id="comment-name"
                    className={`post-page__input ${
                      errors.name ? "post-page__input--error" : ""
                    }`}
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    maxLength={COMMENT_NAME_MAX_LENGTH}
                    value={commentData.name}
                    onChange={handleCommentChange}
                  />

                  {errors.name && (
                    <p className="post-page__error">{errors.name}</p>
                  )}
                </div>

                <div className="post-page__field">
                  <label className="post-page__label" htmlFor="comment-text">
                    <span className="post-page__required">*</span> Отзыв
                  </label>

                  <textarea
                    id="comment-text"
                    className={`post-page__textarea ${
                      errors.text ? "post-page__textarea--error" : ""
                    }`}
                    name="text"
                    placeholder="Добавьте текст отзыва"
                    maxLength={COMMENT_TEXT_MAX_LENGTH}
                    value={commentData.text}
                    onChange={handleCommentChange}
                  />

                  <div className="post-page__textarea-footer">
                    <div>
                      {errors.text && (
                        <p className="post-page__error">{errors.text}</p>
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
                      setErrors({ name: "", text: "" });
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

            <h3
              className="post-page__success-title"
              id="review-success-title"
            >
              Ваш отзыв успешно добавлен
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};