import React from "react";
import './style.css'
import './font-color.css'

class InputTitleLarge extends React.Component {
    render() {
        const {title, type, placeholder, className} = this.props;

        return (
            <div className={className}>
                <div className="h1-title sfpro-regular-normal-black-36px">
                    {title}
                </div>
                <div className="overlap-group-large border-0-5px-mountain-mist">
                    <textarea className="textarea-label sfpro-regular-normal-black-16px"
                              name="label"
                              placeholder={placeholder}
                              type={type}
                              required
                    />
                </div>
            </div>
        );
    }
}

export default InputTitleLarge;