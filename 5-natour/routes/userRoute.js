const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

userRouter.route('/')
    .get(userController.getUser)
    .post(userController.createUser);


userRouter.route('/:id')
    .get(userController.getUserbyID)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = userRouter;
