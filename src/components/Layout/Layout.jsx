import { Header } from "../Header/Header";
import "./Layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};