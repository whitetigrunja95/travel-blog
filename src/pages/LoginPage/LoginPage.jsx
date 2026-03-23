import { Layout } from "../../components/Layout/Layout";
import { LoginForm } from "../../forms/LoginForm/LoginForm";
import "./LoginPage.css";

export const LoginPage = () => {
  return (
    <Layout title="Вход в профиль">
      <section className="login-page">
        <div className="login-page__container">
          <h1 className="login-page__title">Вход в профиль</h1>
          <LoginForm />
        </div>
      </section>
    </Layout>
  );
};