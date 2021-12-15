import React from "react";
import "./Layout.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../HomePage/Home";
import BlogPage from "../../components/BlogPage/BlogPage";
import CreateBlog from "../CreateBlog/CreateBlog";

const Layout: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/blog"} element={<Home />} />
        <Route
          path={process.env.PUBLIC_URL + "/blog/:id"}
          element={<BlogPage />}
        />
        <Route
          path={process.env.PUBLIC_URL + "/blog/create"}
          element={<CreateBlog />}
        />
        <Route
          path={process.env.PUBLIC_URL + "/"}
          element={<Navigate replace to="/blog" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
