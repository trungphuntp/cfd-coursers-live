import React, { useEffect, useState } from "react";
import BlogMenu from "./components/BlogMenu";
import BlogList from "./components/BlogList";
import useQuery from "@/hooks/useQuery";
import { BlogServices } from "@/services/BlogServices";
import useMutation from "@/hooks/useMutation";
import useDebounce from "@/hooks/useDebounce";

const BlogPage = () => {
    const [selectCategories, setSelectCategories] = useState("");
    const { data: dataCategories, loading: loadingCategories } = useQuery(
        BlogServices.getCategoriesBlog
    );

    const query = selectCategories ? `?category=${selectCategories}` : "";

    const handleSetCategories = (newCategories) => {
        setSelectCategories(newCategories);
    };

    const {
        data: dataBlogs,
        loading: loadingBlogs,
        execute: blogsExecute,
    } = useMutation((query) => BlogServices.getBlogs(query));

    const blogs = dataBlogs?.blogs || [];

    useEffect(() => {
        blogsExecute(query);
    }, [query]);

    const loadingApi = loadingCategories || loadingBlogs;
    const loadingPage = useDebounce(loadingApi, 500);

    return (
        <main className="mainwrapper blog --ptop">
            <div className="container">
                <div className="textbox">
                    <div className="container">
                        <h2 className="title --t2">Blog</h2>
                    </div>
                </div>
                <BlogMenu
                    categories={dataCategories?.blogs}
                    handleSetCategories={handleSetCategories}
                    selectCategories={selectCategories}
                />
                <BlogList dataBlogs={blogs} loading={loadingPage} />

                {!loadingPage && (
                    <ul className="paging">
                        <li>
                            <a href="#">
                                <i>
                                    <img src="img/iconprev.svg" alt />
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="active">
                                1
                            </a>
                        </li>
                        <li>
                            <a href="#">2</a>
                        </li>
                        <li>
                            <a href="#">3</a>
                        </li>
                        <li>
                            <a href="#">4</a>
                        </li>
                        <li>
                            <a href="#">
                                <i>
                                    <img src="img/iconprev.svg" alt />
                                </i>
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </main>
    );
};

export default BlogPage;
