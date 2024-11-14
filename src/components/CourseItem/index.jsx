import { COURSES_ITEM_TYPE } from "@/constant/general";
import PATH from "@/constant/pathjs";
import { ROLE } from "@/constant/roles";
import { formatCurrency, formatDate } from "@/utils/format";
import { Link } from "react-router-dom";
import Button from "../Button";

const CourseItem = ({ image, slug, name, teams, startDate, tags, type, price }) => {
    const teacherInfo = teams?.find((menber) => {
        return menber.tags.includes(ROLE.teacher);
    });

    const detailPath = PATH.COURSE.PATH + `/${slug}`;

    if (type === COURSES_ITEM_TYPE.coming) {
        return (
            <div className="coursecoming__item">
                <div className="coursecoming__item-img">
                    <Link to={detailPath}>
                        <img src={image || ""} alt="Khóa học sắp ra mắt CFD" />
                    </Link>
                </div>
                <div className="coursecoming__item-content">
                    <p className="category label">Front-end</p>
                    <h2 className="title --t2">
                        <Link to={detailPath}>{name || ""} </Link>
                    </h2>
                    {
                        /* Teacher infor */
                        teacherInfo?.id && (
                            <div className="user">
                                <div className="user__img">
                                    <img src={teacherInfo.image || ""} alt="Avatar teacher" />
                                </div>
                                <p className="user__name">{teacherInfo.name || ""}</p>
                            </div>
                        )
                    }

                    <div className="info">
                        {startDate && (
                            <div className="labeltext">
                                <span className="label --blue">Ngày khai giảng</span>
                                <p className="title --t2">{formatDate(startDate)}</p>
                            </div>
                        )}

                        {tags?.length > 0 && (
                            <div className="labeltext">
                                <span className="label --blue">Hình thức học</span>
                                <p className="title --t2">{tags.join(" | ")}</p>
                            </div>
                        )}
                    </div>
                    <div className="btnwrap">
                        <Button link={`${PATH.COURSE.ORDER_PATH}/${slug}`} className="btn btn--primary">
                            Đăng Ký Học
                        </Button>
                        <Button link={detailPath} className="btn btn--border --black">
                            Xem chi tiết
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="courses__list-item">
            <div className="img">
                <Link to={detailPath}>
                    <img src={image || ""} alt="Khóa học CFD" className="course__thumbnail" />
                    {tags?.length > 0 && <span className="course__img-badge badge">{tags?.join(" | " || " ")}</span>}
                </Link>
            </div>
            <div className="content">
                <p className="label">Front-End</p>
                <h3 className="title --t3">
                    <Link to={detailPath}>{name || ""}</Link>
                </h3>
                <div className="content__info">
                    {!!teacherInfo?.id && (
                        <div className="user">
                            <div className="user__img">
                                <img src={teacherInfo?.image || ""} alt="Avatar teacher" />
                            </div>
                            <p className="user__name">{teacherInfo.name || ""}</p>
                        </div>
                    )}
                    <div className="price">
                        <strong>{formatCurrency(price)}đ</strong>
                    </div>
                </div>
                <div className="content__action">
                    <Button link={PATH.ORDER_PATH + `/${slug}`}>Đăng ký ngay</Button>
                    <Link to={PATH.COURSE.PATH + `/${slug}`} className="btn btn--default">
                        <img src="img/icon-paper.svg" alt="icon paper" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseItem;
