import { useEffect, useMemo, useState } from "react";
import { Header } from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import defaultAvatar from "../../assets/images/avatar-placeholder.png";
import editIcon from "../../assets/icons/edit.svg";
import {
  getCurrentUser,
  updatePassword,
  updateUser,
} from "../../api/userApi";
import "./ProfilePage.css";

const FULL_NAME_MAX_LENGTH = 255;
const CITY_MAX_LENGTH = 255;
const ABOUT_MAX_LENGTH = 600;

export const ProfilePage = () => {
  const { loadUser } = useAuth();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [photoFile, setPhotoFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    country: "",
    about: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    newPassword: "",
  });

  const aboutLength = useMemo(() => formData.about.length, [formData.about]);

  const applyUserToForm = (user) => {
    setFormData((prev) => ({
      ...prev,
      fullName: user?.full_name || "",
      city: user?.city || "",
      country: user?.country || "",
      about: user?.bio || "",
      newPassword: "",
    }));
  };

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setLoadError("");

      const user = await getCurrentUser();
      applyUserToForm(user);
    } catch (error) {
      console.error(
        "Не удалось загрузить профиль:",
        error.response?.data || error.message
      );
      setLoadError("Не удалось загрузить профиль");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

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

    setPhotoFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const nextErrors = {
      fullName: "",
      newPassword: "",
    };

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Напишите ФИО";
    }

    if (formData.newPassword && formData.newPassword.length < 5) {
      nextErrors.newPassword = "Пароль должен содержать минимум 5 символов";
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
      const updatedUser = await updateUser({
        fullName: formData.fullName,
        city: formData.city,
        country: formData.country,
        bio: formData.about,
        photo: photoFile,
      });

      applyUserToForm(updatedUser);

      if (formData.newPassword.trim()) {
        await updatePassword({
          password: formData.newPassword.trim(),
        });
      }

      await loadUser();
      setIsEditMode(false);
      setPhotoFile(null);
    } catch (error) {
      console.error(
        "Не удалось сохранить профиль:",
        error.response?.data || error.message
      );
      setLoadError("Не удалось сохранить профиль");
    }
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <section className="profile-page__hero">
          <div className="profile-page__hero-overlay" />
          <Header />
          <div className="profile-page__hero-content">
            <h1 className="profile-page__hero-title">
              ИСТОРИИ ВАШИХ ПУТЕШЕСТВИЙ
            </h1>
          </div>
        </section>

        <section className="profile-page__content">
          <div className="profile-page__container">
            <div className="profile-page__state">Загрузка...</div>
          </div>
        </section>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="profile-page">
        <section className="profile-page__hero">
          <div className="profile-page__hero-overlay" />
          <Header />
          <div className="profile-page__hero-content">
            <h1 className="profile-page__hero-title">
              ИСТОРИИ ВАШИХ ПУТЕШЕСТВИЙ
            </h1>
          </div>
        </section>

        <section className="profile-page__content">
          <div className="profile-page__container">
            <div className="profile-page__state profile-page__state--error">
              {loadError}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <section className="profile-page__hero">
        <div className="profile-page__hero-overlay" />
        <Header />

        <div className="profile-page__hero-content">
          <h1 className="profile-page__hero-title">
            ИСТОРИИ ВАШИХ ПУТЕШЕСТВИЙ
          </h1>
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
                      src={avatarPreview}
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
                    <h2 className="profile-page__name">{formData.fullName || "—"}</h2>

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
                    <p className="profile-page__info-value">
                      {formData.city || "—"}
                    </p>
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
                        src={avatarPreview}
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
                        className={`profile-page__input ${
                          errors.fullName ? "profile-page__input--error" : ""
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
                        Город
                      </label>

                      <input
                        id="city"
                        className="profile-page__input"
                        type="text"
                        name="city"
                        placeholder="Город"
                        maxLength={CITY_MAX_LENGTH}
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="profile-page__field">
                      <label className="profile-page__label" htmlFor="about">
                        О себе
                      </label>

                      <textarea
                        id="about"
                        className="profile-page__textarea"
                        name="about"
                        placeholder="Расскажите о себе"
                        maxLength={ABOUT_MAX_LENGTH}
                        value={formData.about}
                        onChange={handleChange}
                      />

                      <div className="profile-page__textarea-footer">
                        <div />
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
                            Новый пароль
                          </label>

                          <input
                            id="newPassword"
                            className={`profile-page__input ${
                              errors.newPassword
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
                            newPassword: "",
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