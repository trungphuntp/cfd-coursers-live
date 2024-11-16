import PATH from "@/constant/pathjs";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ image, name, slug, author, updatedAt, category }) => {
    const blogDetailLink = PATH.BLOG.PATH + `/${slug}`;
    const dateUpdate = formatDate(updatedAt);
    return (
        <div className="blog__list-item">
            <div className="img">
                <Link to={blogDetailLink}>
                    <img src={image || ""} alt="Khóa học CFD" className="course__thumbnail" />
                </Link>
            </div>
            <div className="content">
                <p className="label">{category?.name || ""}</p>
                <h2 className="title --t3">
                    <Link to={blogDetailLink}>{name || ""}</Link>
                </h2>
                <div className="content__info">
                    <div className="user">
                        <div className="user__img">
                            <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
                        </div>
                        <p className="user__name">{author}</p>
                    </div>
                    <div className="date">{dateUpdate}</div>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;
