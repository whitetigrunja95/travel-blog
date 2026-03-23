import { Header } from "../Header/Header";
import { Hero } from "../Hero/Hero";
import "./Layout.css";

export const Layout = ({ children, title }) => {
  return (
    <div className="layout">
      <Header />
      <Hero title={title} />

      <main className="layout__main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};