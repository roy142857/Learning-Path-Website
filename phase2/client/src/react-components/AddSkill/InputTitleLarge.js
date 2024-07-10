import React from 'react';
import './style.css';
import '../SignUp/font-color.css'

class InputTitleLarge extends React.Component {
    render() {
        const {title, type, placeholder, className, inputId, name, labelclass} = this.props;

        return (
            <div>
                <div className="inputTitle sfpro-regular-normal-black-36px">
                    {title}
                </div>
                <div className={className + " border-0-5px-mountain-mist"}>
                    <textarea
                        id={inputId}
                        className={labelclass + " sfpro-regular-normal-black-16px"}
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

export default InputTitleLarge;