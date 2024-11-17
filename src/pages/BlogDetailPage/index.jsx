import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import { BlogServices } from "@/services/BlogServices";
import { formatDate } from "@/utils/format";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import BlogDetailContent from "./components/BlogDetailContent";
import BlogDetailRelated from "./components/BlogDetailRelated";
import BlogDetailTitle from "./components/BlogDetailTitle";

const BlogDetailPage = () => {
    const { blogSlug } = useParams();

    //============== CALL API BLOG DETAIL ==============
    const {
        data: dataBlogDetail,
        loading: loadingBlogDetail,
        execute: executeBlogDetail,
    } = useMutation(BlogServices.getBlogBySlug);
    useEffect(() => {
        executeBlogDetail(`/${blogSlug}`);
    }, [blogSlug]);

    // console.log(dataBlogDetail);

    //============== PROPS BLOG DETAIL TITLE ==============
    const propsTitle = useMemo(() => {
        return {
            name: dataBlogDetail?.name || "",
            category: dataBlogDetail?.category?.name || "",
            author: dataBlogDetail?.author || "",
            date: formatDate(dataBlogDetail?.createdAt || ""),
        };
    }, [dataBlogDetail]);

    //============== PROPS BLOG DETAIL CONTENT ==============
    const propsContent = {
        description: dataBlogDetail?.description,
        image: dataBlogDetail?.image,
    };

    //============== PROPS BLOG DETAIL RELATED ==============

    const category = dataBlogDetail?.category?.id || "";
    const queryBlogRelated = dataBlogDetail ? `?category=${category}&limit=4` : "";
    const {
        data: dataBlog,
        loading: loadingBlog,
        execute: getBlog,
    } = useMutation((query) => BlogServices.getBlogs(query));

    useEffect(() => {
        getBlog(queryBlogRelated);
    }, [queryBlogRelated]);

    const _blogRelated = () => {
        if (!dataBlog?.blogs) return;
        const blogs = [...dataBlog?.blogs] || [];
        // Blog khác blog hiện tại
        const blogsByCategory = blogs?.filter((blog) => {
            return blog?.id !== dataBlogDetail?.id;
        });
        return blogsByCategory;
    };
    console.log(_blogRelated());

    //============== LOADING ==============
    const loadingApi = loadingBlog || loadingBlogDetail;
    const loadingPage = useDebounce(loadingApi, 300);

    return (
        <main className="mainwrapper blogdetail --ptop">
            <div className="container">
                <div className="wrapper">
                    <BlogDetailTitle {...propsTitle} />
                    <BlogDetailContent {...propsContent} loading={loadingPage} />
                </div>
                {category && <BlogDetailRelated blogs={_blogRelated()} loading={loadingPage} />}
            </div>
        </main>
    );
};

export default BlogDetailPage;
