import React, { forwardRef } from "react";

const Input = ({ label, isRequire, error, renderInput, ...rest }, ref) => {
    return (
        <div className="form-group">
            <label className="label">
                {label} {isRequire && <span>*</span>}
            </label>
            {renderInput?.({ ...rest, error }) || (
                <input ref={ref} {...rest} className={`form__input ${error ? "formerror" : ""}`} />
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default forwardRef(Input);
