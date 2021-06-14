import React from "react";
import { Container, Box } from "@material-ui/core";
import { PlayerStats, Ranking, Quiz, Trophies } from "../";
import "./GameContainer.css"

export default class GameContainer extends React.Component {
    render() {
        return (
            <Container maxWidth={false} className="game-container">
                <Box className="game-container-box">
                    <PlayerStats />

                    <Ranking />
                </Box>

                <Quiz />
                
                <Trophies />
            </Container>
        );
    }
}
