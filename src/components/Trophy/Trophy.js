import { Box } from "@material-ui/core";
import React from "react";

const theme = "default";

export default class Trophy extends React.Component {
    render() {
        return (
            <Box className="trophies-list-item">
                <img
                    src={this.props.unlocked ? this.props.image[theme] : this.props.lockedImage}
                    alt=""
                />
            </Box>
        );
    }
}
