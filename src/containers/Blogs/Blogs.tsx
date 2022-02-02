import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import "./Blogs.scss";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
// import axios from "axios";
// import { blogHtml } from "../../components/BlogPage/StaticBlog";

const Blogs: React.FC<IBlogsProps> = ({ items, loading, val }) => {
  // const blogs = [
  //   {
  //     path: "Study habits that are simple and highly effective",
  //     author: "Sudip Maiti",
  //     author_icon: "",
  //     img: "https://fampay.in/blog/content/images/size/w2000/2021/11/Blog-template--1-.png",
  //     title: "Study habits that are simple and highly effective",
  //     tag: "Lifestyle",
  //     html: blogHtml,
  //     createdAt: "2020-12-27T20:13:56.676+00:00",
  //     __v: 123,
  //     _id: "1",
  //     updatedAt: "2020-12-27T20:13:56.676+00:00",
  //   },
  //   {
  //     path: "FamPay’s guide to digital payments for teens: Important Dos and Don'ts",
  //     author: "Sudip Maiti",
  //     author_icon: "",
  //     img: "https://fampay.in/blog/content/images/size/w2000/2021/11/Blog-template--1-.png",
  //     title:
  //       "FamPay’s guide to digital payments for teens: Important Dos and Don'ts",
  //     tag: "Technology",
  //     html: blogHtml,
  //     createdAt: "2020-12-27T20:13:56.676+00:00",
  //     __v: 124,
  //     _id: "2",
  //     updatedAt: "2020-12-27T20:13:56.676+00:00",
  //   },
  //   {
  //     path: "Study habits that are simple and highly effective",
  //     author: "Sudip Maiti",
  //     author_icon: "",
  //     img: "https://fampay.in/blog/content/images/size/w2000/2021/11/Blog-template--1-.png",
  //     title: "Study habits that are simple and highly effective",
  //     tag: "Lifestyle",
  //     html: blogHtml,
  //     createdAt: "2020-12-27T20:13:56.676+00:00",
  //     __v: 124,
  //     _id: "3",
  //     updatedAt: "2020-12-27T20:13:56.676+00:00",
  //   },
  //   {
  //     path: "FamPay’s guide to digital payments for teens: Important Dos and Don'ts",
  //     author: "Sudip Maiti",
  //     author_icon: "",
  //     img: "https://fampay.in/blog/content/images/size/w2000/2021/11/Blog-template--1-.png",
  //     title:
  //       "FamPay’s guide to digital payments for teens: Important Dos and Don'ts",
  //     tag: "Technology",
  //     html: blogHtml,
  //     createdAt: "2020-12-27T20:13:56.676+00:00",
  //     __v: 126,
  //     _id: "4",
  //     updatedAt: "2020-12-27T20:13:56.676+00:00",
  //   },
  // ];
  // const url = "https://mwv-blogapi.herokuapp.com/api";
  // useEffect(() => {
  //   blogs.map((blog) => {
  //     axios
  //       .post(url, blog)
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });
  // }, []);

  return (
    <div>
      <div className="container blogs-container">
        {loading ? (
          <Loader />
        ) : items ? (
          items.map((item: IBlogObjProps) => (
            <Link to={`/blog/${item._id}`}>
              <BlogCard {...item} key={item._id} />
            </Link>
          ))
        ) : null}
      </div>
      <div className="add-blog">
        <h1>Add your own content</h1>
        <Link to={"/blog/create"}>
          <button className="btn-create">Create</button>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
