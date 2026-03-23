import { Link } from "react-router-dom";
import { LoginForm } from "../../forms/LoginForm/LoginForm";
import { AppRoute } from "../../constants/routes";
import "./LoginPage.css";

export const LoginPage = () => {
  return (
    <section className="login-page">
      <div className="login-page__card">
        <span className="login-page__badge">TravelBlog</span>
        <h1 className="login-page__title">С возвращением</h1>
        <p className="login-page__text">
          Войдите, чтобы делиться впечатлениями о поездках и читать истории
          других путешественников.
        </p>

        <LoginForm />

        <p className="login-page__bottom-text">
          Нет аккаунта?{" "}
          <Link className="login-page__link" to={AppRoute.REGISTER}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </section>
  );
};