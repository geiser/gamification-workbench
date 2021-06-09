import React from "react";
import { Container, Box } from "@material-ui/core";
import { PlayerStats, Ranking, Quiz, Trophies } from "../";
import "./GameContainer.css"

export default class GameContainer extends React.Component {
    render() {
        return (
            <Container maxWidth={false} className="game-container">
                <Box className="game-container-box">
                    <PlayerStats
                        correctAnswers={this.props.data.correctAnswers}
                        points={this.props.data.points}
                    />

                    <Ranking
                        points={this.props.data.points}
                        userName={this.props.data.userName}
                        avatar={this.props.data.avatar}
                        themeName={this.props.themeName}
                    />
                </Box>

                <Quiz
                    setAvatar={this.props.setAvatar}
                    updatePoints={this.props.updatePoints}
                    themeName={this.props.themeName}
                />
                
                <Trophies
                    trophies={this.props.data.trophies}
                />
            </Container>
        );
    }
}
