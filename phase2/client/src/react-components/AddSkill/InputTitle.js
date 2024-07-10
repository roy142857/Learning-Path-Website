import React from 'react';
import './style.css';
import '../SignUp/font-color.css'

class InputTitle extends React.Component {
    render() {
        const {title, type, placeholder, className, inputId, name, labelclass, step} = this.props;

        return (
            <div>
                <div className="inputTitle sfpro-regular-normal-black-36px">
                    {title}
                </div>
                <div className={className + " border-0-5px-mountain-mist"}>
                    <input
                        id={inputId}
                        className={labelclass + " sfpro-regular-normal-black-16px"}
                        name={name}
                        placeholder={placeholder}
                        type={type}
                        step={step}
                        required
                    />
                </div>
            </div>
        );
    }
}


export default InputTitle;