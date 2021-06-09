import React from "react";
import { Box } from "@material-ui/core";
import { Player, Header, GameContainer } from "../";
import { localization, trophies } from "../../config.json";

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "Alex",
            avatar: "./assets/" + props.themeName + "/images/avatar1.png",
            points: 0,
            correctAnswers: 0,
            level: 0,
            question: null,
            trophies: [],
        };

        this.state.trophies = trophies.map(trophy => Object.assign(trophy, { unlocked: false }));

        this.setAvatar = this.setAvatar.bind(this);
        this.updatePoints = this.updatePoints.bind(this);
        this.updateTrophies = this.updateTrophies.bind(this);
    }

    setAvatar(avatar) {
        this.setState({ avatar });
    }

    updatePoints(value) {
        let up = value > 0 ? 1 : 0;

        this.setState(prevState => ({
            points: Math.max(0, prevState.points + value),
            level: prevState.level + 1,
            correctAnswers: prevState.correctAnswers + up,
        }), () => {
            this.updateTrophies();
        });
    }

    updateTrophies() {
        let trophyList = {};
        this.state.trophies.forEach(trophy => trophyList[trophy.id] = trophy);

        for (const [id, trophy] of Object.entries(trophyList)) {
            if (this.state.points >= trophy.unlockAt.points
                && this.state.correctAnswers >= trophy.unlockAt.correctAnswers
                && this.state.level >= trophy.unlockAt.question
                && !trophyList[id].unlocked
            ) {
                trophyList[id].unlocked = true;

                this.setState({
                    trophies: Object.values(trophyList),
                });
            }
        }
    }

    onMouseMove(...args) {
        // onMouseMove={this.onMouseMove.bind(this)}
        // console.dir(...args);
    }

    render() {
        return (
            <Box className="game">
                {/* Header */}
                <Header title={localization.title}>
                    <Player
                        userName={this.state.userName}
                        avatar={this.state.avatar}
                    />
                </Header>

                {/* Game */}
                <GameContainer
                    themeName={this.props.themeName}
                    setAvatar={this.setAvatar}
                    updatePoints={this.updatePoints}
                    data={this.state}
                />
            </Box>
        );
    }
}
