import { Game } from "./components";
import {createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import { themes } from "./config.json";
import './App.css';

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const themeName = rand(Object.keys(themes));

const theme = createMuiTheme({
    palette: {
        primary: colors[themes[themeName].primary],
        secondary: colors[themes[themeName].secondary],
    },
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Game themeName={themeName} />
        </MuiThemeProvider>
    );
}

export default App;
