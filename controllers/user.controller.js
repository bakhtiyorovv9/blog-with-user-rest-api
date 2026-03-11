const path = require("node:path");
const { readFile, writeFile } = require("../helpers/fs");

const usersPath = path.join(process.cwd(), "data", "users.json");

exports.getAllUsers = (req, res) => {
    const data = readFile(usersPath);

    res.status(200).send({
        success: true,
        data: data,
    });
};

exports.getUserById = (req, res) => {
    const data = readFile(usersPath);
    const userId = req.params.id;

    const user = data.find((user) => user.id == userId);

    if (!user) {
        res.status(404).send({
            success: false,
            message: "user not found",
        });
        return;
    }

    res.send({
        success: true,
        data: user,
    });
};

exports.deleteUserById = (req, res) => {
    const data = readFile(usersPath);
    const userId = req.params.id;

    const user = data.find((user) => user.id == userId);
    const userIndex = data.findIndex((user) => user.id == userId);

    if (!user) {
        res.status(404).send({
            success: false,
            message: "user not found",
        });
    }
    data.splice(userIndex, 1);
    writeFile(usersPath, data);

    res.send({
        success: true,
        messageb: `user id: ${userId} deleted`
    })
}

exports.createUser = (req, res) => {
    const { name, email, phone} = req.body;

    if (!name || !email || !phone ) {
        res.status(404).send({
            success: false,
            message: "all fields must be filled",
        });
        return;
    }

    const data = readFile(usersPath);

    const lastId = data.sort((a, b) => a.id - b.id).at(-1);


    res.send({
        success: true
    })
};
