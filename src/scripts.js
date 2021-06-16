import * as uuid from "uuid";
import { default as config } from  "./configuration";

const storage = window.localStorage;

export { storage };

export function getSessionId() {
    return storage.getItem("sessionId");
}

export function wasAlreadyRedirectedToPretest() {
    // eslint-disable-next-line
    return storage.getItem("redirectedToPretest") == "true";
}

export function validateSession() {
    let sessionId = storage.getItem("sessionId");
    let created = storage.getItem("created");
    let redirectedToPretest = storage.getItem("redirectedToPretest");

    if (sessionId)
        sessionId = sessionId.replace(/\s/g, "");

    // eslint-disable-next-line
    if (!sessionId || !uuid.validate(sessionId) || redirectedToPretest == undefined
        || isNaN(created) || (Date.now() - created) >= 1 * 60 * 60 * 1000 // expired; 3600000ms = 1hr
    ) {
        console.error("INVALID SESSION");
        throw new Error("invalid session");
    }
}

export function createSession() {
    storage.clear();

    storage.setItem("sessionId", uuid.v4());
    storage.setItem("created", Date.now());
    storage.setItem("redirectedToPretest", false);
}

export function selectEnvironment() {
    return new Promise((resolve, reject) => {
        let envName = storage.getItem("environmentName");

        if (envName)
            return resolve(envName);
                
        let participantAllocation = config.getVar("participantAllocation");
                
        if (participantAllocation === "random") {
            envName = rand(config.getEnvironments());
        } else if (isNaN(participantAllocation)) {
            /*
            // TO DO
            let envList = config.getEnvironments();
            envName = envList[(getParticipantNumberSomehow() % participantAllocation) % envList.length];
            */
            reject("not supported yet");
        } else {
            reject("invalid configuration: \"participantAllocation\"");
        }

        resolve(envName);
    });
}

export function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
