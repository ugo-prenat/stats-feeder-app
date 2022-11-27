"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTClient_1 = require("../utils/getTClient");
const checkUsername = (req, res) => {
    const { username } = req.body;
    getTClient_1.Tclient.userByUsername(username)
        .then(user => user.data ? res.status(200).json({ message: user }) : res.status(200).json({ message: user }))
        .catch(error => res.status(500).json({ error }));
};
exports.default = {
    checkUsername
};
