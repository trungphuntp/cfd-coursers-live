import BlogItem from "@/pages/BlogPage/components/BlogItem";
import { Empty } from "antd";
import React from "react";

const BlogDetailRelated = ({ blogs, loading }) => {
    return (
        <div className="blogdetail__related">
            <h2 className="blogdetail__related-title title --t2">Bài viết liên quan</h2>
            {!loading && blogs?.length <= 0 && <Empty description="Không có bài viết nào!" />}
            {!loading && blogs?.length > 0 && (
                <div className="blog__list">
                    {blogs?.map((blog) => {
                        return <BlogItem {...blog} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default BlogDetailRelated;
