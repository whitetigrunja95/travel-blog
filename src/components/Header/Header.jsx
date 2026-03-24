import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppRoute } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/icons/logo.svg";
import defaultAvatar from "../../assets/images/avatar-placeholder.png";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const userName =
  user?.full_name?.trim() ||
  `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
  `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
  "Пользователь";

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate(AppRoute.HOME);
  };

  const handleProfileClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__top">
          <Link
            className="header__logo"
            to={AppRoute.HOME}
            aria-label="На главную"
          >
            <img src={logo} alt="TravelBlog" className="header__logo-img" />
          </Link>

          <div className="header__actions">
            {!isAuthenticated ? (
              <Link className="header__link-action" to={AppRoute.LOGIN}>
                Войти
              </Link>
            ) : (
              <div className="header__profile">
                <button
                  className="header__profile-trigger"
                  type="button"
                  onClick={handleProfileClick}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                >
                  <img
                    className="header__avatar"
                    src={defaultAvatar}
                    alt="Аватар пользователя"
                  />

                  <span className="header__name">{userName}</span>

                  <span className="header__arrow">{isOpen ? "▴" : "▾"}</span>
                </button>

                {isOpen && (
                  <div className="header__dropdown" role="menu">
                    <Link
                      className="header__dropdown-link"
                      to={AppRoute.PROFILE}
                      onClick={() => setIsOpen(false)}
                    >
                      Профиль
                    </Link>

                    <button
                      className="header__dropdown-button"
                      type="button"
                      onClick={handleLogout}
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="header__line" />
      </div>
    </header>
  );
};