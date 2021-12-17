import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Editor from "../../components/BlogEditor/Editor";
import "./CreateBlog.scss";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");
  const [authorImg, setAuthorImg] = useState<string>("");
  const [mainImg, setMainImg] = useState<string>("");
  const [blogObj, setBlogObj] = useState<object>({});

  const showInputAuthorImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      setAuthorImg(e.target.result);
    };
  };

  const showInputMainImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      setMainImg(e.target.result);
    };
  };

  const updateBlogContent = (value: any) => {
    setBlogContent(value);
  };

  const url = "https://mwv-blogapi.herokuapp.com/api";

  const submitHandler = (e: any) => {
    e.preventDefault();
    setBlogObj({
      path: title.replace(" ", "-"),
      author: author,
      author_icon: authorImg,
      img: mainImg,
      title: title,
      tag: category,
      html: String(blogContent),
    });
    console.log(blogObj);
    axios
      .post(url, blogObj)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="create-blog-page">
      <fieldset className="blog-details">
        <legend>Create a Blog</legend>
        <div className="blog-details-content">
          <div className="row-details">
            <div className="col-25">
              <label htmlFor="title">Title(max 200 characters) :</label>
            </div>
            <div className="col-75">
              <textarea
                value={title}
                style={{ resize: "none" }}
                name="title"
                id="title"
                required
                rows={1}
                maxLength={200}
                autoComplete="off"
                className="col-75-input"
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
              <span>{200 - title.length}</span>
            </div>
          </div>
          <div className="row-details">
            <div className="col-25">
              <label htmlFor="name">Author Name :</label>
            </div>
            <div className="col-75">
              <textarea
                value={author}
                style={{ resize: "none" }}
                name="name"
                id="name"
                required
                rows={1}
                maxLength={50}
                autoComplete="off"
                className="col-75-input"
                onChange={(e) => setAuthor(e.target.value)}
              ></textarea>
              <span>{50 - author.length}</span>
            </div>
          </div>
          <div className="row-details">
            <div className="col-25">
              <label htmlFor="tag">Tag(Category) :</label>
            </div>
            <div className="col-75">
              <select
                name="tag"
                id="tag"
                className="col-75-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Technology">Technology</option>
                <option value="Fashion">Fashion</option>
                <option value="Science">Science</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
          </div>
          <div className="row-details">
            <div className="col-25">
              <label htmlFor="tag">Upload Main Image:</label>
            </div>
            <div className="col-75 col-75-img">
              <p>
                Images should be at least 640×320px (1280×640px for best
                display). Should be in 2:1 ratio.
              </p>
              <div className="main">
                <div className="input-img-wrapper main-wrapper">
                  <div
                    className="input-img"
                    style={{ backgroundImage: `url(${mainImg})` }}
                  ></div>
                </div>
                <div className="choose-input">
                  <div className="choose-input-btns">
                    <label htmlFor="imgMain" className="choose-btn">
                      Upload Image
                    </label>
                    {mainImg && mainImg !== "" ? (
                      <button
                        className="btn-remove"
                        onClick={() => setMainImg("")}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <input
                    accept="image/*"
                    type="file"
                    name="imgMain"
                    id="imgMain"
                    required
                    hidden
                    onChange={(e) => showInputMainImage(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row-details">
            <div className="col-25">
              <label htmlFor="tag">Upload Author Image:</label>
            </div>
            <div className="col-75 col-75-img">
              <p>
                Images should be at least 50×50px (200 * 200px for best
                display). Should be in 1:1 ratio.
              </p>
              <div className="auhtor">
                <div className="input-img-wrapper author-wrapper">
                  <div
                    className="input-img"
                    style={{ backgroundImage: `url(${authorImg})` }}
                  ></div>
                </div>
                <div className="choose-input">
                  <div className="choose-input-btns">
                    <label htmlFor="imgAuthor" className="choose-btn">
                      Upload Image
                    </label>
                    {authorImg && authorImg !== "" ? (
                      <button
                        className="btn-remove"
                        onClick={() => setAuthorImg("")}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <input
                    accept="image/*"
                    type="file"
                    name="imgAuthor"
                    id="imgAuthor"
                    required
                    hidden
                    onChange={(e) => showInputAuthorImage(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-editor">
          <h2>Add Your Blog Content :</h2>
          <Editor value={blogContent} onchange={updateBlogContent} />
        </div>
        <div className="last-btn-div">
          <button className="btn-submit" onClick={submitHandler}>
            Submit
          </button>
          <Link to={"/blog"}>
            <button className="btn-back">Back</button>
          </Link>
        </div>
      </fieldset>
    </div>
  );
};

export default CreateBlog;
