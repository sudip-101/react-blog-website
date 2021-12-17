import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircularScroll from "../CircularScroll/CircularScroll";
import "./BlogPage.scss";
import axios from "axios";
import moment from "moment";
import parse from "html-react-parser";

const BlogPage: React.FC = () => {
  let params = useParams();
  const BLOG_ID = params.id;
  const [oneBlog, setOneBlog] = useState<IItemsArr>();
  const scrollMeasurer = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`https://mwv-blogapi.herokuapp.com/api/id/${BLOG_ID}`)
      .then((response) => {
        console.log(response.data.result);
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
      <div className="blog-page-top">
        <div
          className="blog-page-bg"
          style={{
            backgroundImage: oneBlog
              ? `url(${oneBlog?.img})`
              : `url("https://fampay.in/blog/content/images/size/w2000/2021/11/Blog-template--1-.png")`,
          }}
        ></div>
      </div>
      <div className="container blog-page-container">
        <div className="page-mid" ref={scrollMeasurer}>
          <div className="blog-main">
            <div className="blog-top">
              <h1>
                {oneBlog
                  ? oneBlog?.title
                  : "Study habits that are simple and highly effective 📚"}
              </h1>
              <div className="bottom">
                <span>{oneBlog ? oneBlog?.tag : "Lifestyle"}</span>
                <span>•</span>
                <span>{moment(oneBlog?.createdAt).format("ll")}</span>
              </div>
            </div>
            <div className="blog-content">
              {oneBlog ? (
                parse(oneBlog ? oneBlog.html : "")
              ) : (
                <>
                  <p>
                    Student life is definitely not easy, and having to study
                    literally all the time for exam or the other can be super
                    frustrating. But as they say, there is a method to every
                    madness - Let's talk about the method. Exam season is here
                    and we know you need some study advice to keep your head in
                    the game.
                  </p>
                  <p>
                    <strong>1. (Don't) stop cramming 🙇‍♂️</strong>
                  </p>
                  <p>
                    Cramming is the worst way to understand anything, especially
                    when you try to cram all your syllabus in one night. The
                    trick is to read the same chapter, same syllabus every week
                    - such that your brain naturally remembers what you read.
                    Remember when Jeetu Bhaiya said - "21 din mein koi bhi aadat
                    ban jaati hai", yes exactly that!
                  </p>
                  <div>
                    <img
                      src="https://fampay.in/blog/content/images/2021/11/image.png"
                      alt=""
                    />
                  </div>
                  <p>
                    <strong>
                      2. Make sure you have a set time to study ⏳
                    </strong>
                  </p>
                  <p>
                    You know when we were young and moms used to say - 'Roz bas
                    ek ghanta padh le!' Well that's true my friend. Studying
                    just 1 hours everyday, on a set time will save you from
                    those all nighters right before exam. Don't just try to be
                    consistent with your study, study at the same hour everyday.
                  </p>
                  <div>
                    <img
                      src="https://fampay.in/blog/content/images/2021/11/image-1.png"
                      alt=""
                    />
                  </div>
                  <p>
                    <strong>
                      3. Understand and try to love what you study 💖📚
                    </strong>
                  </p>
                  <p>
                    While it's true that a formula or an equation will not
                    really help you in life 10 years later, it's still knowledge
                    that makes us more curious, and open to learning. Learning
                    new concepts of any new subject is super fun and
                    interesting! If you really try to love what you're studying,
                    you are surely going to ace it!
                  </p>
                  <div>
                    <img
                      src="https://fampay.in/blog/content/images/2021/11/image-2.png"
                      alt=""
                    />
                  </div>
                  <p>
                    <strong>4. Don't study without a goal 🥅</strong>
                  </p>
                  <p>
                    Why do your textbooks have separate chapters and questions
                    after each on of them? It's because each chapter addresses a
                    different part of the subject and needs to be studied
                    separately. Always study one chapter at a time, and finish
                    the entire chapter fully before moving on to the next one.
                  </p>
                  <div>
                    <img
                      src="https://fampay.in/blog/content/images/2021/11/image-4.png"
                      alt=""
                    />
                  </div>
                  <p>
                    <strong>
                      5. Start with the difficult subjects or topics 🙆‍♂️
                    </strong>
                  </p>
                  <p>
                    How many times have you started a study session and asked
                    yourself - "Shuru kaha se karu?" We have a simple solution
                    to this huge problem - start with the most difficult. It
                    will take the most time and will give the most confidence
                    when you successfully complete it.
                  </p>
                  <div>
                    <img
                      src="https://fampay.in/blog/content/images/2021/11/image-5.png"
                      alt=""
                    />
                  </div>
                  <p>
                    <strong>6. Don't study (too much) 🙅‍♀️</strong>
                  </p>
                  <p>
                    This is definitely the most important point. Studying the
                    entire syllabus in one hour is just as effective and not
                    studying at all. Space your studying time out over shorter
                    periods of time, with breaks in between.
                  </p>
                  <div>
                    <img
                      src="https://fampay.in/blog/content/images/2021/11/image-8.png"
                      alt=""
                    />
                  </div>
                  <p>
                    <strong>7. Always study in a quite setting 🏡</strong>
                  </p>
                  <p>
                    Distraction is easy. Distraction will also mean
                    understanding less. Studying needs a flow. Remember that one
                    really good study session you had. How each word that you
                    read was so easy to understand, you could relate to each and
                    every question and understand most concepts. Now look at the
                    larger picture and see how quiet and peaceful that
                    environment was. That's what you need every time.
                  </p>
                  <div>
                    <img
                      src="https://fampay.in/blog/content/images/2021/11/image-7.png"
                      alt=""
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="blog-bar">
            <div className="blog-bar-btns">
              <div
                className="round-btn round-scroll-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
    </div>
  );
};

export default BlogPage;
