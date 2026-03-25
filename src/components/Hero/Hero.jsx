import "./Hero.css";
import heroImg from "../../assets/images/hero/hero.png";
import heroImg2x from "../../assets/images/hero/hero@2x.png";

export const Hero = ({ title }) => {
  return (
    <section className="hero">
      <img
        className="hero__bg"
        src={heroImg}
        srcSet={`${heroImg} 1x, ${heroImg2x} 2x`}
        alt=""
        aria-hidden="true"
      />

      <div className="container hero__content">
        <h1 className="hero__title">{title}</h1>
      </div>
    </section>
  );
};