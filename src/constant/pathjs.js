// Blog
const BLOG_PATH = "/blog";

// Courses
const COURSE_PATH = "/courses";
const COURSE_ORDER = "/courses-order";

// About
const ABOUT_PATH = "/about";

// Contact
const CONTACT_PATH = "/contact";

// Payment
const PAYMENT_PATH = "/payment-method";

// Privacy
const PRIVACY_PATH = "/privacy";

// Profile
const PROFILE_PATH = "/student-profile";

const PATH = {
    HOME: "/",
    COURSE: {
        PATH: COURSE_PATH,
        DETAIL: COURSE_PATH + "/:courseSlug",
        ORDER_PATH: COURSE_ORDER,
        ORDER: COURSE_ORDER + "/:courseSlug",
    },
    PROFILE: {
        PATH: PROFILE_PATH,
        COURSE: PROFILE_PATH + "/my-courses",
        METHOD: PROFILE_PATH + "/my-method",
    },
    BLOG: {
        PATH: BLOG_PATH,
        DETAIL: BLOG_PATH + "/:blogSlug",
    },
    ABOUT: ABOUT_PATH,
    CONTACT: CONTACT_PATH,
    PAYMENT: PAYMENT_PATH,
    PRIVACY: PRIVACY_PATH,
};

export default PATH;
