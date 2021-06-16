import React from "react";
import { ErrorScreen, Game, Loading } from "./components";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import './App.css';

import { default as config } from  "./configuration";
import Context from "./contexts/Context";

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            environment: null,
            errorMessage: null,

            getPlayer: null,
            setPlayer: (player, cb) => this.setState({ getPlayer: player }, cb),
        };

        this.theme = null;
    }

    componentDidMount() {
    	let participantAllocation = config.getVar("participantAllocation");
    	let environment;

    	if (participantAllocation === "random") {
    		environment = rand(config.getEnvironments());
    	} else if (!isNaN(participantAllocation)) {
    		/*
    		// TO DO
    		let envList = config.getEnvironments();
			environment = envList[getParticipantNumberSomehow() % participantAllocation] % envList.length;
    		*/
    	} else {
            this.setState({
                errorMessage: "invalid configuration: \"participantAllocation\"",
            });
        }

        config.getEnvironment(environment)
        .then(environment => {
            this.theme = this.defineTheme(environment.theme);

            this.setState({ environment });
        })
        .catch(e => {
            this.setState({ errorMessage: e.message });
        });
    }

    defineTheme(theme) {
        return createMuiTheme({
            palette: {
                primary: colors[theme.primary],
                secondary: colors[theme.secondary],
            }
        });
    }

    render() {
        if (this.state.errorMessage) {
            return ( <ErrorScreen message={this.state.errorMessage} /> );
        }

        // waiting for environment
        if (!this.state.environment) {
            return ( <Loading fullscreen={true} /> );
        }

        return (
            <Context.Provider value={this.state}>
                <MuiThemeProvider theme={this.theme}>
                    <Game />
                </MuiThemeProvider>
            </Context.Provider>
        );
    }
}
