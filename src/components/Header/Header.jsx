import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
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
      <div className="container header__container">
        <Link className="header__logo" to={AppRoute.HOME}>
          TravelBlog
        </Link>

        <div className="header__actions">
          {!isAuthenticated ? (
            <>
              <Link className="header__button header__button--outline" to={AppRoute.REGISTER}>
                Регистрация
              </Link>

              <Link className="header__button header__button--filled" to={AppRoute.LOGIN}>
                Войти
              </Link>
            </>
          ) : (
            <>
              <Link className="header__button header__button--outline" to={AppRoute.PROFILE}>
                Профиль
              </Link>

              <button
                className="header__button header__button--filled"
                type="button"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};