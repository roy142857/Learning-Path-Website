import React from "react";
import './style.css'
import './font-color.css'

class InputTitleLong extends React.Component {
    render() {
        const {title, type, placeholder, className, name} = this.props;

        return (
            <div className={className}>
                <div className="h1-title sfpro-regular-normal-black-36px">
                    {title}
                </div>
                <div className="overlap-group-long border-0-5px-mountain-mist">
                    <input
                        className="input-label sfpro-regular-normal-black-16px"
                        name={name}
                        placeholder={placeholder}
                        type={type}
                        required
                    />
                </div>
            </div>
        );
    }
}

export default InputTitleLong;