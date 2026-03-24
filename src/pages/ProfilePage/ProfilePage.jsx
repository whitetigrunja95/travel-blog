import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import defaultAvatar from "../../assets/images/avatar-placeholder.png";
import editIcon from "../../assets/icons/edit.svg";
import "./ProfilePage.css";

const FULL_NAME_MAX_LENGTH = 255;
const CITY_MAX_LENGTH = 255;
const ABOUT_MAX_LENGTH = 600;

const mockUser = {
  fullName: "Боярская Варвара Михайловна",
  city: "Вышний Волочёк",
  about:
    "Я обожаю путешествовать. Мне нравится открывать для себя новые места, знакомиться с разными культурами и традициями. Я всегда готова отправиться в путь, даже если это означает покинуть зону комфорта. В дороге я встречаю новых людей, учусь новому и наслаждаюсь красотами природы. Путешествия дают мне возможность расширить свой кругозор и узнать больше о мире вокруг меня. Я уверена, что каждый новый опыт делает меня сильнее и мудрее.",
  avatar: defaultAvatar,
};

export const ProfilePage = () => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: mockUser.fullName,
    city: mockUser.city,
    about: mockUser.about,
    newPassword: "",
    repeatPassword: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState(mockUser.avatar);

  const [errors, setErrors] = useState({
    fullName: "",
    city: "",
    about: "",
    newPassword: "",
    repeatPassword: "",
  });

  const aboutLength = useMemo(() => formData.about.length, [formData.about]);

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

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedAvatar(imageUrl);
  };

  const validateForm = () => {
    const nextErrors = {
      fullName: "",
      city: "",
      about: "",
      newPassword: "",
      repeatPassword: "",
    };

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Напишите ФИО";
    }

    if (formData.newPassword && formData.newPassword.length < 5) {
      nextErrors.newPassword = "Пароль должен содержать минимум 5 символов";
    }

    if (formData.newPassword !== formData.repeatPassword) {
      nextErrors.repeatPassword = "Пароли должны совпадать";
    }

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    console.log("Профиль готов к отправке:", {
      ...formData,
      avatar: selectedAvatar,
    });

    setIsEditMode(false);
  };

  return (
    <div className="profile-page">
      <section className="profile-page__hero">
        <div className="profile-page__hero-overlay" />
        <Header />

        <div className="profile-page__hero-content">
          <h1 className="profile-page__hero-title">ИСТОРИИ ВАШИХ ПУТЕШЕСТВИЙ</h1>
        </div>
      </section>

      <section className="profile-page__content">
        <div className="profile-page__container">
          {!isEditMode ? (
            <section className="profile-page__view-card">
              <div className="profile-page__view-layout">
                <div className="profile-page__avatar-column">
                  <div className="profile-page__avatar-box">
                    <img
                      className="profile-page__avatar-image"
                      src={selectedAvatar}
                      alt="Аватар пользователя"
                    />
                  </div>

                  <label className="profile-page__change-photo">
                    <span className="profile-page__change-photo-icon">📷</span>
                    <span>Изменить фото</span>
                    <input
                      className="profile-page__file-input"
                      type="file"
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>

                <div className="profile-page__info-column">
                  <div className="profile-page__info-top">
                    <h2 className="profile-page__name">{formData.fullName}</h2>

                    <button
                      className="profile-page__edit-button"
                      type="button"
                      aria-label="Редактировать профиль"
                      onClick={() => setIsEditMode(true)}
                    >
                      <img
                        className="profile-page__edit-icon"
                        src={editIcon}
                        alt=""
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="profile-page__info-block">
                    <p className="profile-page__info-label">Город:</p>
                    <p className="profile-page__info-value">{formData.city || "—"}</p>
                  </div>

                  <div className="profile-page__info-block">
                    <p className="profile-page__info-label">О себе:</p>
                    <p className="profile-page__about">{formData.about || "—"}</p>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="profile-page__edit-card">
              <form
                className="profile-page__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="profile-page__form-layout">
                  <div className="profile-page__avatar-column">
                    <div className="profile-page__avatar-box">
                      <img
                        className="profile-page__avatar-image"
                        src={selectedAvatar}
                        alt="Аватар пользователя"
                      />
                    </div>

                    <label className="profile-page__change-photo">
                      <span className="profile-page__change-photo-icon">📷</span>
                      <span>Изменить фото</span>
                      <input
                        className="profile-page__file-input"
                        type="file"
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>

                  <div className="profile-page__fields-column">
                    <div className="profile-page__field">
                      <label className="profile-page__label" htmlFor="fullName">
                        <span className="profile-page__required">*</span> ФИО
                      </label>

                      <input
                        id="fullName"
                        className={`profile-page__input ${errors.fullName ? "profile-page__input--error" : ""
                          }`}
                        type="text"
                        name="fullName"
                        placeholder="ФИО"
                        maxLength={FULL_NAME_MAX_LENGTH}
                        value={formData.fullName}
                        onChange={handleChange}
                      />

                      {errors.fullName && (
                        <p className="profile-page__error">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="profile-page__field">
                      <label className="profile-page__label" htmlFor="city">
                        <span className="profile-page__required">*</span> Город
                      </label>

                      <input
                        id="city"
                        className={`profile-page__input ${errors.city ? "profile-page__input--error" : ""
                          }`}
                        type="text"
                        name="city"
                        placeholder="Город"
                        maxLength={CITY_MAX_LENGTH}
                        value={formData.city}
                        onChange={handleChange}
                      />

                      {errors.city && (
                        <p className="profile-page__error">{errors.city}</p>
                      )}
                    </div>

                    <div className="profile-page__field">
                      <label className="profile-page__label" htmlFor="about">
                        О себе
                      </label>

                      <textarea
                        id="about"
                        className={`profile-page__textarea ${errors.about ? "profile-page__textarea--error" : ""
                          }`}
                        name="about"
                        placeholder="Расскажите о себе"
                        maxLength={ABOUT_MAX_LENGTH}
                        value={formData.about}
                        onChange={handleChange}
                      />

                      <div className="profile-page__textarea-footer">
                        <div>
                          {errors.about && (
                            <p className="profile-page__error">{errors.about}</p>
                          )}
                        </div>

                        <span className="profile-page__counter">
                          {aboutLength} / {ABOUT_MAX_LENGTH}
                        </span>
                      </div>
                    </div>

                    <div className="profile-page__password-section">
                      <h3 className="profile-page__password-title">Смена пароля</h3>

                      <div className="profile-page__password-row">
                        <div className="profile-page__field">
                          <label
                            className="profile-page__label"
                            htmlFor="newPassword"
                          >
                            <span className="profile-page__required">*</span> Новый пароль
                          </label>

                          <input
                            id="newPassword"
                            className={`profile-page__input ${errors.newPassword
                                ? "profile-page__input--error"
                                : ""
                              }`}
                            type="password"
                            name="newPassword"
                            placeholder="Новый пароль"
                            value={formData.newPassword}
                            onChange={handleChange}
                          />

                          {errors.newPassword && (
                            <p className="profile-page__error">
                              {errors.newPassword}
                            </p>
                          )}
                        </div>

                        <div className="profile-page__field">
                          <label
                            className="profile-page__label"
                            htmlFor="repeatPassword"
                          >
                            <span className="profile-page__required">*</span> Повторите пароль
                          </label>

                          <input
                            id="repeatPassword"
                            className={`profile-page__input ${errors.repeatPassword
                                ? "profile-page__input--error"
                                : ""
                              }`}
                            type="password"
                            name="repeatPassword"
                            placeholder="Повторите пароль"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                          />

                          {errors.repeatPassword && (
                            <p className="profile-page__error">
                              {errors.repeatPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="profile-page__actions">
                      <button
                        className="profile-page__button profile-page__button--secondary"
                        type="button"
                        onClick={() => {
                          setIsEditMode(false);
                          setErrors({
                            fullName: "",
                            city: "",
                            about: "",
                            newPassword: "",
                            repeatPassword: "",
                          });
                        }}
                      >
                        Назад
                      </button>

                      <button
                        className="profile-page__button profile-page__button--primary"
                        type="submit"
                      >
                        Сохранить
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};