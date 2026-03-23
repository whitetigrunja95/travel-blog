import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AppRoute } from "../../constants/routes";
import "./LoginForm.css";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setServerError("");
      await login(data);
      navigate("/");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setServerError("Неправильный логин или пароль");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && <p className="login-form__server-error">{serverError}</p>}

      <div className="login-form__field">
        <label className="login-form__label" htmlFor="email">
          Логин
        </label>
        <input
          className={`login-form__input ${
            errors.email ? "login-form__input--error" : ""
          }`}
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Введите email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          })}
        />
        {errors.email && (
          <span className="login-form__error">{errors.email.message}</span>
        )}
      </div>

      <div className="login-form__field">
        <label className="login-form__label" htmlFor="password">
          Пароль
        </label>
        <input
          className={`login-form__input ${
            errors.password ? "login-form__input--error" : ""
          }`}
          id="password"
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 5,
              message: "Пароль должен содержать минимум 5 символов",
            },
          })}
        />
        {errors.password && (
          <span className="login-form__error">{errors.password.message}</span>
        )}
      </div>

      <div className="login-form__actions">
        <button
          className="login-form__register-button"
          type="button"
          onClick={() => navigate(AppRoute.REGISTER)}
        >
          Зарегистрироваться
        </button>

        <button className="login-form__submit" type="submit" disabled={isSubmitting}>
          Войти
        </button>
      </div>
    </form>
  );
};