import React from "react";

const BlogDetailTitle = ({ name, date, author, category }) => {
    return (
        <div className="blogdetail__title">
            <h1 className="title --t2">{name || ""}</h1>
            <ul className="meta">
                <li className="meta__item">Đăng bởi {` ${author || ""}`}</li>
                <li className="meta__item">{category || ""}</li>
                <li className="meta__item">{date || ""}</li>
            </ul>
        </div>
    );
};

export default BlogDetailTitle;
