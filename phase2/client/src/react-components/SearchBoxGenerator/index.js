import React from "react";
import "./style.css";
import TextField from "@material-ui/core/TextField";
import {Grid} from "@material-ui/core";


class SearchBoxGenerator extends React.Component {

    state = {}

    render() {
        const {} = this.props;

        return (
            <Grid item xl={3} lg={3} md={4} s={12} xs={12} className={"topright"}>
                <TextField
                    name={"Search"}
                    label={"Search for anything"}
                    defaultValue={""}
                    className="input"
                    margin="normal"
                    onChange={null}
                />
            </Grid>
        );
    }
}

export default SearchBoxGenerator;