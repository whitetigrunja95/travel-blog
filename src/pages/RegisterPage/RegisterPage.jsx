import { Layout } from "../../components/Layout/Layout";
import { RegisterForm } from "../../forms/RegisterForm/RegisterForm";
import "./RegisterPage.css";

export const RegisterPage = () => {
  return (
    <Layout title="Регистрация">
      <section className="register-page">
        <div className="register-page__container">
          <h1 className="register-page__title">Регистрация</h1>
          <RegisterForm />
        </div>
      </section>
    </Layout>
  );
};