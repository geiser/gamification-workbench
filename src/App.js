import React from "react";
import { ErrorScreen, Game, Loading } from "./components";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import './App.css';

import { storage, getSessionId, selectEnvironment, wasAlreadyRedirectedToPretest } from "./scripts";
import { default as config } from  "./configuration";
import Context from "./contexts/Context";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            environment: null,
            errorMessage: null,

            getPlayer: null,
            setPlayer: (player, cb) => this.setState({ getPlayer: player }, cb),
        };

        this.theme = null;
        this.sendUserToPretest = false;

        this.setReady = this.setReady.bind(this);
        this.mountErrorScreen = this.mountErrorScreen.bind(this);
    }

    componentDidMount() {
        selectEnvironment()
        .then(envName => config.getEnvironment(envName))
        .then(environment => {
            // Se 'environmentName' não estiver definido, é porque a sessão é inválida ou é a primeira vez que o usuário acessa a página
            // eslint-disable-next-line
            if (storage.getItem("environmentName") == undefined && !wasAlreadyRedirectedToPretest()) {
                storage.setItem("environmentName", environment.name);
                storage.setItem("redirectedToPretest", true);

                if (environment.preTest) {
                    window.location = environment.preTest
                        .replace(/\{\{sessionId\}\}/g, getSessionId())
                        .replace(/\{\{points\}\}/g, 0) // ??????
                    ;

                    return;
                } else {
                    console.warn(`Pretest for "${environment.name}" is not defined in "${environment.file}"`);
                }
            }

            console.table(storage);

            this.theme = this.defineTheme(environment.theme);
            this.setState({ environment }, this.setReady);
        })
        .catch(this.mountErrorScreen);
    }

    setReady() {
        this.setState({ ready: true });
    }

    mountErrorScreen(message) {
        if (typeof message === "object")
            message = message.message || message.errorMessage;
        
        this.setState({ errorMessage: message });
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
        if (!this.state.ready) {
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
