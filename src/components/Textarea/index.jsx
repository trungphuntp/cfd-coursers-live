import React from "react";

const Textarea = ({ className, error, ...rest }) => {
    return (
        <textarea
            className={`form__input ${error ? "formerror" : ""} ${className ? className : ""}`}
            defaultValue={""}
            {...rest}
        />
    );
};

export default Textarea;
