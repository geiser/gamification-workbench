import React from "react";
import { Box, Typography } from "@material-ui/core";
import { AvatarSelection, Loading, Question } from "../";
import Context from "../../contexts/Context";
import "./Quiz.css";

export default class Quiz extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            headerText: null,
            textContent: null,
            onQuiz: false,
            avatarList: [],
        };
    

        this.changeHeader = this.changeHeader.bind(this);
        this.changeText = this.changeText.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
        this.onAnswer = this.onAnswer.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    componentDidMount() {
        let env = this.context.environment;

        this.setState({
            ready: true,
            headerText: env.localization.avatarSelection.header,
            textContent: env.localization.avatarSelection.text,
            avatarList: env.avatarList,
        });
    }

    changeHeader(headerText) {
        this.setState({ headerText });
    }

    changeText(textContent) {
        this.setState({ textContent });
    }

    startQuiz() {
        let localization = this.context.environment.localization;

        this.setState({
            onQuiz: true,
            headerText: localization.quiz.header,
            textContent: localization.quiz.text,
        });
    }

    onAnswer({ questionId, answer }) {
        console.dir({ questionId, answer });
    }

    onFinish() {

    }

    render() {
        let player = this.context.getPlayer();

        return (
            <Box className="quiz-box">
                <Typography variant="h5" className="text-header">{this.state.headerText}</Typography>
                <Typography variant="h6" className="text-content">{this.state.textContent}</Typography>

                {!this.state.ready
                ? ( <Loading /> )
                : 
                (
                    !this.state.onQuiz
                    ? (
                        <AvatarSelection
                            setAvatar={player.setAvatar}
                            avatars={this.state.avatarList}
                            onClickNext={this.startQuiz}
                        />
                    )
                    :
                    (
                        <Question
                            onAnswer={this.onAnswer}
                            onFinish={this.onFinish}
                        />
                    )
                )}
            </Box>
        );
    }
}
