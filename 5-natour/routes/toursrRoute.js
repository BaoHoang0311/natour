const express = require('express');
const tourRouter = express.Router();
const tourController = require('../controller/tourController');

// tourRouter.param('id', tourController.checkID)
// tourRouter.param('id', (req, res, next, val) => {
//     console.log(`Tour id is: ${val}`);
//     let id = req.params.id;
//     if (id >= tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid'
//         })
//     }
//     next();
// })




tourRouter.route('/')
    .get(tourController.getAllTours)
    // .post(tourController.checkbody,tourController.createTour)
    .post(tourController.createTour)

tourRouter.route('/:tourid')
    // .get(tourController.checkID)
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)


module.exports = tourRouter;
