import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircularScroll from "../CircularScroll/CircularScroll";
import "./BlogPage.scss";
import axios from "axios";
import moment from "moment";
import parse from "html-react-parser";
import Loader from "../Loader/Loader";

const BlogPage: React.FC = () => {
  let params = useParams();
  const BLOG_ID = params.id;
  const [oneBlog, setOneBlog] = useState<IItemsArr>();
  const scrollMeasurer = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState<number>(0);
  const [blogPageLoading, setBlogPageLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`https://mwv-blogapi.herokuapp.com/api/id/${BLOG_ID}`)
      .then((response) => {
        console.log(response.data.result);
        setBlogPageLoading(false);
        setOneBlog(response.data.result);
      })
      .catch((error) => console.log(error));
  }, [BLOG_ID]);

  function scrollCheckHandler() {
    let maxScrollLength = 0;
    if (scrollMeasurer.current) {
      maxScrollLength = scrollMeasurer.current.getBoundingClientRect().height;
      let top = scrollMeasurer.current.offsetTop;
      let maxPercent = ((window.pageYOffset - top) / maxScrollLength) * 100;
      if (maxPercent >= 100) maxPercent = 100;
      setPercent(maxPercent);
    }
  }

  useEffect(() => {
    scrollCheckHandler();
    window.addEventListener("scroll", scrollCheckHandler);
    window.addEventListener("resize", scrollCheckHandler);
    return () => {
      window.removeEventListener("scroll", scrollCheckHandler);
      window.removeEventListener("resize", scrollCheckHandler);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="BlogPage">
      <header className="blog-page-header">
        <Link to={"/blog"}>
          <div className="round-back-btn">
            <span>
              <i className="fas fa-long-arrow-alt-left"></i>
            </span>
          </div>
        </Link>
      </header>
      {blogPageLoading ? (
        <Loader />
      ) : (
        <>
          <div className="blog-page-top">
            <div
              className="blog-page-bg"
              style={{
                backgroundImage: `url(${oneBlog?.img})`,
              }}
            ></div>
          </div>
          <div className="container blog-page-container">
            <div className="page-mid" ref={scrollMeasurer}>
              <div className="blog-main">
                <div className="blog-top">
                  <h1>{oneBlog?.title}</h1>
                  <div className="bottom">
                    <span>{oneBlog?.tag}</span>
                    <span>•</span>
                    <span>{moment(oneBlog?.createdAt).format("ll")}</span>
                  </div>
                </div>
                <div className="blog-content">
                  {parse(oneBlog ? oneBlog.html : "")}
                </div>
              </div>
              <div className="blog-bar">
                <div className="blog-bar-btns">
                  <div
                    className="round-btn round-scroll-btn"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <span>
                      <i className="fas fa-long-arrow-alt-up"></i>
                    </span>
                    <CircularScroll percent={percent} />
                  </div>
                  <div className="round-btn">
                    <span>
                      <i className="fab fa-twitter"></i>
                    </span>
                  </div>
                  <div className="round-btn">
                    <span>
                      <i className="fab fa-facebook-square"></i>
                    </span>
                  </div>
                  <div className="round-btn">
                    <span>
                      <i className="fab fa-whatsapp"></i>
                    </span>
                  </div>
                  <div className="round-btn">
                    <span>
                      <i className="fas fa-ellipsis-h"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="blog-page-bottom">
            <div className="newsletter">
              <div className="part-title">
                <h2>Subscribe to our newsletter</h2>
                <p>Get the latest posts delivered right to your inbox.</p>
              </div>
              <form className="newsletter-form">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your e-mail"
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
            <div className="fampay-team">
              <div>
                <img
                  src="https://fampay.in/blog/content/images/2020/11/logo.png"
                  alt=""
                />
              </div>
              <div className="title-social">
                <p>FamPay Team</p>
                <div className="social">
                  <div className="social-btn">
                    <span>
                      <i className="fas fa-globe-asia"></i>
                    </span>
                  </div>
                  <div className="social-btn">
                    <span>
                      <i className="fab fa-facebook-square"></i>
                    </span>
                  </div>
                  <div className="social-btn">
                    <span>
                      <i className="fab fa-twitter"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
