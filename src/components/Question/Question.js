import React from "react";
import { Box, Typography } from "@material-ui/core";
import { AnswerOptions } from "../";
import { localization, questions } from "../../config.json";
import "./Question.css";

export default class Question extends React.Component {
    constructor(props) {
        super(props);

        this.questions = questions;

        this.state = {
            currentQuestion: this.questions[0],
            questionIndex: 0,
            showMessage: null,
            text: null,
        };

        this.feedbackTimeout = null;
        this.valid = true;
        this.answers = {};

        this.checkAnswer = this.checkAnswer.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    // alias
    get currentQuestion() {
        return this.state.currentQuestion;
    }

    checkAnswer(answer) {
        if (!this.valid)
            return;
        
        clearTimeout(this.feedbackTimeout);
        
        // right
        if (answer === this.currentQuestion.rightAnswer) {
            this.props.updatePoints(10);
            // new Audio('./assets/default/audio/right.mp3').play();
            this.setState({ showMessage: "right" });
        }
        // wrong
        else {
            this.props.updatePoints(-5);
            // new Audio('./assets/default/audio/wrong.mp3').play();
            this.setState({ showMessage: "wrong" });
        }

        function hide() { this.setState({ showMessage: null }) }
        this.feedbackTimeout = setTimeout(hide.bind(this), 2000);

        this.answers[this.currentQuestion.id] = answer;

        this.nextQuestion();
    }

    nextQuestion() {
        if (this.state.questionIndex >= this.questions.length - 1) {
            this.valid = false;
            this.props.onFinish();
            // TO DO
            return;
        }

        this.setState(prevState => ({
            currentQuestion: this.questions[prevState.questionIndex + 1],
            questionIndex: prevState.questionIndex + 1,
            text: this.currentQuestion.text,
        }));
    }

    render() {
        let feedbackStyle = {
            display: !!this.state.showMessage ? "block" : "none",
            background: this.state.showMessage === "right" ? "#238823" : "#d2222d",
        };

        return (
            <>
                <Box className="question-box">
                    <Box className="question">
                        <Typography variant="h6">Questão {this.state.questionIndex + 1}/{this.questions.length}</Typography>

                        {this.currentQuestion.text}
                        
                        <img src={this.currentQuestion.image} alt="" />
                    </Box>

                    <AnswerOptions
                        answers={this.currentQuestion.answers}
                        onAnswer={this.checkAnswer}
                    />
                </Box>

                <div className="question-box feedback" style={feedbackStyle}>
                    {this.state.showMessage === "right" ? localization.rightAnswer : localization.wrongAnswer}
                </div>
            </>
        )
    }
}
