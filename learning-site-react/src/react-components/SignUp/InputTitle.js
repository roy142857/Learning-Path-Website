import React from 'react';
import './style.css';
import './font-color.css'

class InputTitle extends React.Component {
    render() {
        const {title, type, placeholder, className, inputId} = this.props;

        return (
            <div className={className}>
                <div className="h1-title sfpro-regular-normal-black-36px">
                    {title}
                </div>
                <div className="overlap-group border-0-5px-mountain-mist">
                    <input
                        id = {inputId}
                        className="input-label sfpro-regular-normal-black-16px"
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

export default InputTitle;