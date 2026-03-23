import "./RegisterForm.css";

export const RegisterForm = () => {
  return (
    <form className="register-form">
      <div className="register-form__field">
        <label className="register-form__label" htmlFor="register-email">
          Email
        </label>
        <input
          className="register-form__input"
          id="register-email"
          name="email"
          type="email"
          placeholder="Введите email"
        />
      </div>

      <div className="register-form__field">
        <label className="register-form__label" htmlFor="register-password">
          Пароль
        </label>
        <input
          className="register-form__input"
          id="register-password"
          name="password"
          type="password"
          placeholder="Введите пароль"
        />
      </div>

      <div className="register-form__field">
        <label
          className="register-form__label"
          htmlFor="register-confirm-password"
        >
          Подтверждение пароля
        </label>
        <input
          className="register-form__input"
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
        />
      </div>

      <button className="register-form__submit" type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
};