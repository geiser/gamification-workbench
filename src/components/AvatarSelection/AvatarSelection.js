import React from "react";
import { Box, Button } from "@material-ui/core";
import { Avatar } from "../";
import { localization } from "../../config.json";

export default class AvatarSelection extends React.Component {
    render() {
        return (
            <Box>
                <Box className="avatar-selection">
                    {this.props.avatars.map((avatar, i) => (
                        <Avatar
                            key={i}
                            avatar={avatar}
                            setAvatar={this.props.setAvatar}
                        />
                    ))}
                </Box>

                <center style={{margin: "16px"}}>
                    <Button variant="contained" color="primary" size="large" onClick={this.props.onClickNext}>{localization.avatarSelection.next}</Button>
                </center>
            </Box>
        );
    }
}