import { Link, NavLink } from "react-router-dom";
import { AppRoute } from "../../constants/routes";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Link className="header__logo" to={AppRoute.HOME}>
          TravelBlog
        </Link>

        <nav className="header__nav">
          <NavLink
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
            to={AppRoute.HOME}
          >
            Главная
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
            to={AppRoute.LOGIN}
          >
            Вход
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
            to={AppRoute.REGISTER}
          >
            Регистрация
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
            to={AppRoute.CREATE_POST}
          >
            Создать пост
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
            to={AppRoute.PROFILE}
          >
            Профиль
          </NavLink>
        </nav>
      </div>
    </header>
  );
};