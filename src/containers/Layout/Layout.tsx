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
        <Route path={"/blog"} element={<Home />} />
        <Route path={"/blog/:id"} element={<BlogPage />} />
        <Route path={"/blog/create"} element={<CreateBlog />} />
        <Route path={"/"} element={<Navigate replace to={"/blog"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
