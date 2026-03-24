import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/icons/logo.svg";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(AppRoute.HOME);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__top">
          <Link className="header__logo" to={AppRoute.HOME} aria-label="На главную">
            <img src={logo} alt="TravelBlog" className="header__logo-img" />
          </Link>

          <div className="header__actions">
            {!isAuthenticated ? (
              <Link className="header__link-action" to={AppRoute.LOGIN}>
                Войти
              </Link>
            ) : (
              <>
                <Link className="header__link-action" to={AppRoute.CREATE_POST}>
                  Добавить путешествие
                </Link>

                <Link className="header__link-action" to={AppRoute.PROFILE}>
                  Профиль
                </Link>

                <button
                  className="header__link-action header__logout"
                  type="button"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </>
            )}
          </div>
        </div>

        <div className="header__line" />
      </div>
    </header>
  );
};