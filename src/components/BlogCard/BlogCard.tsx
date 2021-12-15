import React from "react";
import "./BlogCard.scss";
import moment from "moment";

const BlogCard: React.FC<IItemsArr> = (props) => {
  return (
    <div className="blog-card">
      <div
        className="card-img"
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      ></div>
      <div className="card-content">
        <h3 className="title">{props.tag}</h3>
        <h2 className="content">{props.title}</h2>
        <div className="bottom">
          <span>{moment(props.createdAt).format("ll")}</span>
          <span>•</span>
          <span>{moment(props.updatedAt).format("ll")}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
