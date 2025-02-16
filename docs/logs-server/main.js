#!/usr/bin/env node

// Find out node location with
// whereis node

// Install express globally for node that will be used
// npm install -g express

// How to import (or require) a module installed globally:
// npm link <MODULE_NAME>

import express from 'express'

const app = express()

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

import fs from 'fs/promises'

async function readLockUnlockLogFile() {
    try {
        const data = await fs.readFile('/Users/v4gy1m7/Documents/.lockStateObserver/log.txt', { encoding: 'utf8' });
        return data.split("\n").reverse().join("\n");
    } catch (err) {
        console.error(err);
        return "";
    }
}

app.get("/logs", async (req, res) => {
    console.log("info", "Request received: ", req.route.path);
    const logFile = await readLockUnlockLogFile();
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "https://timecontrol.firebaseapp.com");
    res.send(logFile);
});

app.listen(7654, function() { console.log("Server is up and running");  });

// node or browser:
// fetch('http://127.0.0.1:7654/logs').then(response => response.text()).then(t => console.log(t))
// on Brave: had to disable the Shields for the website, because the request is treated as tracker or ad by Brave.
// Had to also add access-control-allow-origin header.