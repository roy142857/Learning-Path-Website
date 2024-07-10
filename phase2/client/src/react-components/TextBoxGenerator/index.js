import React from "react";
import "./style.css";
import {Container} from "@material-ui/core"
import {Box} from "@material-ui/core"


class TextBoxGenerator extends React.Component {

    state = {}

    render() {
        const {title, content, maxWidth, bgcolor = '#FFFFFF'} = this.props;

        return (
            <div id={'box'}>
                <Container fixed>
                    <Box sx={{bgcolor: this.props.bgcolor, width: this.props.maxWidth}}>
                        <p>{this.props.title}</p>
                        <span className="content">{this.props.content}</span>
                    </Box>

                </Container>
            </div>
        );
    }
}

export default TextBoxGenerator;