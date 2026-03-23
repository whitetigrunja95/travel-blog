import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./RegisterForm.css";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    try {
      setServerError("");
      await registerUser({
        email: data.email,
        password: data.password,
      });
      navigate("/");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      setServerError("Не удалось зарегистрироваться. Проверьте введённые данные.");
    }
  };

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="register-form__field">
        <label className="register-form__label" htmlFor="register-email">
          Email
        </label>
        <input
          className={`register-form__input ${
            errors.email ? "register-form__input--error" : ""
          }`}
          id="register-email"
          type="email"
          placeholder="Введите email"
          {...register("email", {
            required: "Введите email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          })}
        />
        {errors.email && (
          <span className="register-form__error">{errors.email.message}</span>
        )}
      </div>

      <div className="register-form__field">
        <label className="register-form__label" htmlFor="register-password">
          Пароль
        </label>
        <input
          className={`register-form__input ${
            errors.password ? "register-form__input--error" : ""
          }`}
          id="register-password"
          type="password"
          placeholder="Введите пароль"
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 5,
              message: "Пароль должен содержать минимум 5 символов",
            },
          })}
        />
        {errors.password && (
          <span className="register-form__error">{errors.password.message}</span>
        )}
      </div>

      <div className="register-form__field">
        <label
          className="register-form__label"
          htmlFor="register-confirm-password"
        >
          Подтверждение пароля
        </label>
        <input
          className={`register-form__input ${
            errors.confirmPassword ? "register-form__input--error" : ""
          }`}
          id="register-confirm-password"
          type="password"
          placeholder="Повторите пароль"
          {...register("confirmPassword", {
            required: "Подтвердите пароль",
            validate: (value) =>
              value === passwordValue || "Пароли не совпадают",
          })}
        />
        {errors.confirmPassword && (
          <span className="register-form__error">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {serverError && (
        <p className="register-form__server-error">{serverError}</p>
      )}

      <button
        className="register-form__submit"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Регистрируем..." : "Зарегистрироваться"}
      </button>
    </form>
  );
};