import { Link } from "react-router-dom";
import { RegisterForm } from "../../forms/RegisterForm/RegisterForm";
import { AppRoute } from "../../constants/routes";
import "./RegisterPage.css";

export const RegisterPage = () => {
  return (
    <section className="register-page">
      <div className="register-page__card">
        <span className="register-page__badge">TravelBlog</span>
        <h1 className="register-page__title">Создайте аккаунт</h1>
        <p className="register-page__text">
          Зарегистрируйтесь, чтобы публиковать истории путешествий, оставлять
          отзывы и сохранять свой профиль.
        </p>

        <RegisterForm />

        <p className="register-page__bottom-text">
          Уже есть аккаунт?{" "}
          <Link className="register-page__link" to={AppRoute.LOGIN}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
};