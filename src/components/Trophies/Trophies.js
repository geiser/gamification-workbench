import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Trophy } from "../";
import "./Trophies.css";

export default class Trophies extends React.Component {
    render() {
        return (
            <Box className="trophies-container">
                <Typography variant="h5">Meus troféus</Typography>

                <Box className="trophies-list">
                    {
                        this.props.trophies.map(trophy => (
                            <Trophy
                                key={trophy.id}
                                {...trophy}
                            />
                        ))
                    }
                </Box>
            </Box>
        );
    }
}
