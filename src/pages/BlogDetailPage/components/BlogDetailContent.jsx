import React from "react";

const BlogDetailContent = ({ description, image, loading }) => {
    const linkShare = {
        facebook: "https://www.facebook.com/trungphuntp/",
        linkedin: "https://www.linkedin.com/",
    };

    return (
        <div className="blogdetail__content">
            <img src={image || "/img/imageBlogDetail.jpg"} alt="Post thumnail" />
            <div
                className="blogdetail__content-entry"
                dangerouslySetInnerHTML={{ __html: description || "" }}
            ></div>
            <div className="blogdetail__line" />
            <div className="blogdetail__content-social btngroup">
                <a href={linkShare.facebook} className="btn btn-fb" target="_blank">
                    <img src="/img/icon-fb-share.svg" alt />
                    <span>Share</span>
                </a>
                <a href={linkShare.linkedin} className="btn btn-linkedin" target="_blank">
                    <img src="/img/icon-in-share.svg" alt />
                    <span>Share</span>
                </a>
            </div>
        </div>
    );
};

export default BlogDetailContent;
