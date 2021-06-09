import React from "react";
import { Box, Typography } from "@material-ui/core";
import { localization } from "../../config.json";
import "./PlayerStats.css";

export default class PlayerStats extends React.Component {
    render() {
        return (
            <Box className="game-box game-box-stats">
                <Box className="game-box game-box-stats-item">
                    <Typography variant="h5">
                        {localization.points}
                    </Typography>
                    <Typography variant="h4" style={{textAlign: "center"}}>
                        {this.props.points}
                    </Typography>
                </Box>

                <Box className="game-box game-box-stats-item">
                    <Typography variant="h5">
                        {localization.rightAnswers}
                    </Typography>
                    <Typography variant="h4" style={{textAlign: "center"}}>
                        {this.props.correctAnswers}
                    </Typography>
                </Box>
            </Box>
        );
    }
}
