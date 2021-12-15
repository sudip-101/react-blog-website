import React from "react";
import "./Hero.scss";

const Hero: React.FC<IHeroProps> = ({ getSearch, search, updateSearch }) => {
  return (
    <div className="container hero-container">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <h1 className="title">UnRead by FamPay</h1>
        <p className="title-para">
          FamPay's blog page of unread, raw and inspiring stories 😎
        </p>
        <form className="hero-form subscribe-form">
          <input
            type="text"
            className="hero-form-input email-input"
            placeholder="Your E-Mail Address"
            required
          />
          <div>
            <button type="submit" className="btn btn-subscribe hero-form-btn">
              Subscribe
            </button>
          </div>
        </form>
        <form className="hero-form search-form" onSubmit={getSearch}>
          <input
            type="text"
            className="hero-form-input search-input"
            placeholder="Search"
            required
            value={search}
            onChange={updateSearch}
          />
          <div>
            <button type="submit" className="btn btn-search hero-form-btn">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
