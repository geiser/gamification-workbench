const express = require('express');
const app = express();
const fs = require('fs')
const uuid = require('uuid');
const path = require('path');
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "./build")));

app.post("/api/teste", (req, res) => {
    res.send({ message: "yoooooooooo!!!!!!!!!!" });
})

app.post("/save-response", (req, res) => {
    saveResponse(req.body);

    res.end();
});

function saveResponse(body) {
    // generates a random id for the participant's response
    var respId = uuid.v1();

    // data to be saved (participant's response)
    var response = [ respId ];

    // responses from body
    for (const r of config.responsesFromBody) {
        response.push(body[r]);
    }

    response = response.join(";") + "\n";

    fs.stat("responses.csv", (err) => {
        if (err == null) {
            // write the actual data and end with newline
            fs.appendFile("responses.csv", response, (err) => {
                if (err) throw err;
            });
        } else {
            var headers = [ "responseId", ...config.responsesFromBody ];
            headers = headers.join(";") + "\n";

            fs.writeFile("responses.csv", headers + response, (err) => {
                if (err) throw err;
                console.log("Response saved!");
            })
        }
    });
}

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, function() {
    console.log(`The server is listening to ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);

    if (process.env.pm_id === undefined) {
        console.warn("You are not running the server with PM2! If the server crashes it won't start again.");
    }
});
