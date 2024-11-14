import React from "react";
import { Link } from "react-router-dom";

const Button = ({ variant = "primary", className, link, children, disabled, ...rest }) => {
    let variantButton = "";

    switch (variant) {
        case "primary":
            variantButton = "btn btn--primary";
            break;
        case "border":
            variantButton = "btn btn--border --black";
            break;
        case "grey":
            variantButton = " btn btn--grey";
            break;

        default:
            break;
    }

    if (disabled) {
        variantButton = " btn btn--grey";
        rest.onClick = () => {};
    }
    if (!!link) {
        return (
            <Link to={link} className={`${variantButton} ${className ? className : ""}`} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button className={`${variantButton} ${className ? className : ""}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
