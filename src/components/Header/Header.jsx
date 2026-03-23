import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/login">Вход</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/posts/create">Создать пост</Link>
        <Link to="/profile">Профиль</Link>
      </nav>
    </header>
  );
};