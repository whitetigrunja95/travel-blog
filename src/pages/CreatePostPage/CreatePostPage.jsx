import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { createPost } from "../../api/postsApi";
import "./CreatePostPage.css";

const TITLE_MAX_LENGTH = 255;
const LOCATION_MAX_LENGTH = 255;
const DESCRIPTION_MAX_LENGTH = 2000;

const validateImageFile = (file) => {
  if (!file) {
    return "Загрузите фотографию";
  }

  const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.type)) {
    return "Можно загрузить только JPEG или PNG";
  }

  return "";
};

export const CreatePostPage = () => {
  const navigate = useNavigate();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    city: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [errors, setErrors] = useState({
    photo: "",
    title: "",
    country: "",
    city: "",
    description: "",
  });

  const descriptionLength = useMemo(
    () => formData.description.length,
    [formData.description]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);

    setErrors((prev) => ({
      ...prev,
      photo: file ? validateImageFile(file) : "Загрузите фотографию",
    }));
  };

  const validateForm = () => {
    const nextErrors = {
      photo: validateImageFile(selectedFile),
      title: "",
      country: "",
      city: "",
      description: "",
    };

    if (!formData.title.trim()) {
      nextErrors.title = "Напишите заголовок";
    }

    if (!formData.country.trim()) {
      nextErrors.country = "Напишите название страны";
    }

    if (!formData.city.trim()) {
      nextErrors.city = "Напишите название города";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Добавьте описание";
    }

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      await createPost({
        title: formData.title.trim(),
        country: formData.country.trim(),
        city: formData.city.trim(),
        description: formData.description.trim(),
        photo: selectedFile,
      });

      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(
        "Не удалось создать пост:",
        error.response?.data || error.message
      );
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="create-post-page">
      <section className="create-post-page__hero">
        <div className="create-post-page__hero-overlay" />
        <Header />

        <div className="create-post-page__hero-content">
          <h1 className="create-post-page__hero-title">
            ИСТОРИИ ВАШИХ ПУТЕШЕСТВИЙ
          </h1>
        </div>
      </section>

      <section className="create-post-page__content">
        <div className="create-post-page__container">
          <div className="create-post-page__card">
            <h2 className="create-post-page__title">
              Добавление истории о путешествии
            </h2>

            <form className="create-post-form" onSubmit={handleSubmit} noValidate>
              <div className="create-post-form__upload">
                <label
                  className={`create-post-form__upload-button ${errors.photo ? "create-post-form__upload-button--error" : ""
                    }`}
                  htmlFor="photo"
                >
                  <span className="create-post-form__upload-icon">⇩</span>
                  <span>
                    {selectedFile ? selectedFile.name : "Загрузите ваше фото"}
                  </span>
                </label>

                <input
                  id="photo"
                  className="create-post-form__file-input"
                  type="file"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onChange={handleFileChange}
                />

                {errors.photo && (
                  <p className="create-post-form__error">{errors.photo}</p>
                )}
              </div>

              <div className="create-post-form__field">
                <label className="create-post-form__label" htmlFor="title">
                  <span className="create-post-form__required">*</span> Заголовок
                </label>

                <input
                  id="title"
                  className={`create-post-form__input ${errors.title ? "create-post-form__input--error" : ""
                    }`}
                  type="text"
                  name="title"
                  placeholder="Заголовок"
                  maxLength={TITLE_MAX_LENGTH}
                  value={formData.title}
                  onChange={handleChange}
                />

                {errors.title && (
                  <p className="create-post-form__error">{errors.title}</p>
                )}
              </div>

              <div className="create-post-form__row">
                <div className="create-post-form__field">
                  <label className="create-post-form__label" htmlFor="country">
                    <span className="create-post-form__required">*</span> Страна
                  </label>

                  <input
                    id="country"
                    className={`create-post-form__input ${errors.country ? "create-post-form__input--error" : ""
                      }`}
                    type="text"
                    name="country"
                    placeholder="Страна"
                    maxLength={LOCATION_MAX_LENGTH}
                    value={formData.country}
                    onChange={handleChange}
                  />

                  {errors.country && (
                    <p className="create-post-form__error">{errors.country}</p>
                  )}
                </div>

                <div className="create-post-form__field">
                  <label className="create-post-form__label" htmlFor="city">
                    <span className="create-post-form__required">*</span> Город
                  </label>

                  <input
                    id="city"
                    className={`create-post-form__input ${errors.city ? "create-post-form__input--error" : ""
                      }`}
                    type="text"
                    name="city"
                    placeholder="Город"
                    maxLength={LOCATION_MAX_LENGTH}
                    value={formData.city}
                    onChange={handleChange}
                  />

                  {errors.city && (
                    <p className="create-post-form__error">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="create-post-form__field">
                <label className="create-post-form__label" htmlFor="description">
                  <span className="create-post-form__required">*</span> Описание
                </label>

                <textarea
                  id="description"
                  className={`create-post-form__textarea ${errors.description ? "create-post-form__textarea--error" : ""
                    }`}
                  name="description"
                  placeholder="Добавьте описание вашей истории"
                  maxLength={DESCRIPTION_MAX_LENGTH}
                  value={formData.description}
                  onChange={handleChange}
                />

                <div className="create-post-form__textarea-footer">
                  <div>
                    {errors.description && (
                      <p className="create-post-form__error">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <span className="create-post-form__counter">
                    {descriptionLength} / {DESCRIPTION_MAX_LENGTH}
                  </span>
                </div>
              </div>

              <div className="create-post-form__actions">
                <button
                  className="create-post-form__button create-post-form__button--secondary"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  <span className="create-post-form__button-arrow">←</span>
                  <span>Назад</span>
                </button>

                <button
                  className="create-post-form__button create-post-form__button--primary"
                  type="submit"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {isSuccessModalOpen && (
        <div
          className="success-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <div className="success-modal__overlay" onClick={closeSuccessModal} />

          <div className="success-modal__content">
            <button
              className="success-modal__close"
              type="button"
              aria-label="Закрыть"
              onClick={closeSuccessModal}
            >
              ×
            </button>

            <h3 className="success-modal__title" id="success-modal-title">
              Ваша история успешно добавлена
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};