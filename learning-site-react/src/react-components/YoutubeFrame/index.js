import React from "react";
import Course from "../Course";

class YoutubeFrame extends React.Component {
    render() {
        const { src } = this.props
        return(
            <iframe width="1200" height="600" src={src} title="YouTube video player"
                    frameBorder="20"
                    marginWidth="100"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
        )
    }
}

export default YoutubeFrame