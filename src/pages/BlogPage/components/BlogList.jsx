import { Empty, Skeleton } from "antd";
import BlogItem from "./BlogItem";
import Pagination from "./Pagination";

const BlogList = ({ dataBlogs, loading }) => {
    return (
        <>
            <div className="blog__list">
                {dataBlogs?.length > 0 &&
                    !loading &&
                    dataBlogs?.map((item, index) => {
                        const { id } = item;
                        return <BlogItem key={id || index} {...item} />;
                    })}
                {!loading && dataBlogs?.length <= 0 && (
                    <Empty description="Không có bài viết nào" style={{ margin: "0 auto" }} />
                )}
                {loading &&
                    Array(6)
                        .fill(" ")
                        .map((_, index) => {
                            return (
                                <>
                                    <div className="blog__list-item">
                                        <Skeleton active avatar />
                                        <br />
                                        <Skeleton active />
                                    </div>
                                    <br />
                                    <br />
                                </>
                            );
                        })}
            </div>
            {!loading && <Pagination />}
        </>
    );
};

export default BlogList;
