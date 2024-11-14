import React from "react";

const Textarea = ({ className, error, ...rest }) => {
    return <textarea className={`form__input ${error ? "formerror" : ""} ${className}`} defaultValue={""} {...rest} />;
};

export default Textarea;
