import React from "react";
import { Box, Typography } from "@material-ui/core";
import { AvatarSelection, Question } from "../";
import { localization, avatarList } from "../../config.json";
import "./Quiz.css";

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headerText: localization.avatarSelection.header,
            textContent: localization.avatarSelection.text,
            onQuiz: false,
        };
        
        this.avatarList = avatarList[props.themeName];

        this.changeHeader = this.changeHeader.bind(this);
        this.changeText = this.changeText.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
        this.onAnswer = this.onAnswer.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    changeHeader(headerText) {
        this.setState({ headerText });
    }

    changeText(textContent) {
        this.setState({ textContent });
    }

    startQuiz() {
        this.setState({
            onQuiz: true,
            headerText: localization.quiz.header,
            textContent: localization.quiz.text,
        });
    }

    onAnswer({ questionId, answer }) {
        console.dir({ questionId, answer })
    }

    onFinish() {

    }

    render() {
        return (
            <Box className="quiz-box">
                <Typography variant="h5" className="text-header">{this.state.headerText}</Typography>
                <Typography variant="h6" className="text-content">{this.state.textContent}</Typography>

                {!this.state.onQuiz
                ? 
                    (
                        <AvatarSelection
                            setAvatar={this.props.setAvatar}
                            avatars={this.avatarList}
                            onClickNext={this.startQuiz}
                        />
                    )
                : // else
                    (
                        <Question
                            updatePoints={this.props.updatePoints}
                            onAnswer={this.onAnswer}
                            onFinish={this.onFinish}
                        />
                    )
                }
            </Box>
        );
    }
}
