const fs = require('fs');
const Tour = require('../models/tourModel');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//! check ID

// exports.checkID = (req, res, next, val) => {
//     console.log(`Tour id is: ${val}`);
//     let id = req.params.id;
//     if (id >= tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid'
//         })
//     }
//     next();
// }

//# end region

//! middleware checkboy
exports.checkbody = (req, res, next) => {
    const { name, ratting, price } = req.body
    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing'
        })
    }
    next();
}
//# end region

exports.getAllTours = async (req, res) => {
    try {
        // copy dont care ref
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        //{'difficulty':'easy','duration':{$gte:9}}
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        console.log(queryStr);
        const afteParseQueryString = console.log(JSON.parse(queryStr));

        let query = Tour.find(afteParseQueryString);
        
        if(req.query.sort){
            // sort=-duration,ratingsAverage (desc)
            console.log(req.query.sort.replace(/,/g,' '));
            query = query.sort(req.query.sort);
        }
        else{
            query = query.sort('createdAt');
        }

        if(req.query.fields){
            let c = req.query.fields.replace(/,/g,' ');
            'name duration createdAt'
            query = query.select(c);
            //'-name -duration'// not include
            // query = query.select(c);
        }
        else{
            query = query.select('-__v -description -summary ');
        }
        query = query.select('-images');
        //4) Pagination
        const page = req.query.page * 1 || 1;
        const limit  = req.query.limit * 1 || 100;
        const skip = (page-1 )* limit;

        query = query.skip(skip).limit(limit);
        //5) Excute
        const tours = await query;
        res.status(200).json({
            status: 'success',
            results: tours.length,
            requestTime: req.abcTime,
            data: {
                tours:tours
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            requestTime: req.abcTime,
            message: err,
        });
    }
}

//! Create Tour
// exports.createTour = (req, res) => {
// const data = req.body;
// const newId = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newId, description: "test" }, data);
// tours.push(newTour);
// fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), (err, data) => {
//     res.status(201).json({
//         status: 'success',
//         data: {
//             tour: newTour,
//         }
//     });
// })
// }

exports.createTour = async (req, res) => {
    // const { name, ratting, price } = req.body
    try {
        console.log(req.body);
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            time: req.abcTime,
            data: {
                tour: newTour,
            }
        });
    }
    catch (err) {
        console.log('dasdasdad', err);
        res.status(400).json({
            status: 'fail',
            thoigian: req.abcTime,
            message: err,
        });
    }
}
//# endregion


//! get tour by ID
exports.getTour = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    const tour = await Tour.findById(id);
    // await Tous.findOne({_id : req.param.id})
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        }
    });
}
//# endregion


//! update tour
// exports.updateTour = (req, res) => {
//     let id = req.params.id;
//     const tour = tours.find(el => el.id === parseInt(id));
//     if (!tour) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid'
//         })
//     }
//     tour.description = req.body.description;
//     return res.status(200).json({
//         status: 'fail',
//         data: {
//             tour
//         }
//     })
// }

exports.updateTour = async (req, res) => {
    let id = req.params.id;
    try {
        let tour = await Tour.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'true',
            time: req.abcTime,
            data: {
                tour: tour,
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        })
    }
}


exports.deleteTour = async (req, res) => {
    let id = req.params.id;
    try {
        let tour = await Tour.findByIdAndDelete({ _id: id })
        res.status(200).json({
            status: 'true',
            time: req.abcTime,
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        })
    }
}