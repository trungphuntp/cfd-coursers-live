import PATH from "@/constant/pathjs";
import React from "react";
import { Link } from "react-router-dom";

const BlogMenu = ({ categories, selectCategories, handleSetCategories }) => {
    const _onClickMenu = (id) => {
        handleSetCategories(id);
    };

    return (
        <div className="blog__menu">
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    _onClickMenu("");
                }}
                className={`blog__menu-item ${selectCategories === "" ? "active" : ""}`}
            >
                Tất cả
            </Link>

            {categories?.map((item, index) => {
                const { id, name } = item;
                return (
                    <Link
                        onClick={(e) => {
                            e.preventDefault();
                            _onClickMenu(id);
                        }}
                        key={id || index}
                        className={`blog__menu-item ${selectCategories === id ? "active" : ""}`}
                    >
                        {name || ""}
                    </Link>
                );
            })}
        </div>
    );
};

export default BlogMenu;
