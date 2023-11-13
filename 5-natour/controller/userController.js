const fs = require('fs');

console.log("userController",__dirname);
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getUserbyID = (req, res) => {
    console.log(req.params.id);
    res.status(200).json({
        status: 'success',
        results: users.length,
        requestTime: req.abcTime,
        data: {
            users: users,
        },
    });
}

exports.getUser = (req, res) => {
    console.log("dddd");
    res.status(200).json({
        status: 'success',
        results: users.length,
        requestTime: req.abcTime,
        data: {
            users: users,
        },
    });
}

exports.createUser = (req, res) => {
    console.log(req.params.id);
    res.status(201).json({
        status: 'success',
        results: tours.length,
        requestTime: req.abcTime,
    });
}

exports.updateUser = (req, res) => {
    console.log(req.params.id);
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestTime: req.abcTime,
        requestFrom: "Update User"
    });
}

exports.deleteUser = (req, res) => {
    console.log(req.params.id);
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestTime: req.abcTime,
        requestFrom: "Delete User"
    });
}