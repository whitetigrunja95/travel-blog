import "./LoginForm.css";

export const LoginForm = () => {
  return (
    <form className="login-form">
      <div className="login-form__field">
        <label className="login-form__label" htmlFor="email">
          Email
        </label>
        <input
          className="login-form__input"
          id="email"
          name="email"
          type="email"
          placeholder="Введите email"
        />
      </div>

      <div className="login-form__field">
        <label className="login-form__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="login-form__input"
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
        />
      </div>

      <button className="login-form__submit" type="submit">
        Войти
      </button>
    </form>
  );
};