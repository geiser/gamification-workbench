import React from "react";
import { Box, Typography } from "@material-ui/core";
import { RankingPlayer } from "../";
import { localization, ranking } from "../../config.json";
import "./Ranking.css";

export default class Ranking extends React.Component {
    constructor(props) {
        super(props);

        this.ranking = ranking[props.themeName].map(p => Object.assign(p, {
            avatar: p.avatar.replace(/\{theme\}/g, props.themeName)
        }));
    }

    render() {
        let players = [...this.ranking, {
            name: this.props.userName,
            avatar: this.props.avatar,
            points: this.props.points,
        }]
        .sort((a, b) => b.points - a.points)
        .map((player, i) => (
            <RankingPlayer
                key={player.name}
                name={player.name}
                avatar={player.avatar}
                points={player.points}
                position={i + 1}
            />
        ));

        return (
            <Box className="game-container-ranking">
                <Typography variant="h5">{localization.ranking}</Typography>
                
                <Box className="ranking-box">
                    {players}
                </Box>
            </Box>
        );
    }
}
