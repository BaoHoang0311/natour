const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    let id = req.params.id;
    if (id >= tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid'
        })
    }
    next();
}

exports.checkbody = (req, res, next) => {
    console.log(req.body.name);
    let name = "";
    if ( !name  ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing'
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestTime: req.abcTime,
        data: {
            tours: tours,
        },
    });
}

exports.createTour = (req, res) => {
    const data = req.body;
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId, description: "test" }, data);
    tours.push(newTour);
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), (err, data) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            }
        });
    })
}

exports.getTour = (req, res) => {
    let id = req.params.id;
    const tour = tours.find(el => el.id === parseInt(id))
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        }
    });
}

exports.updateTour = (req, res) => {
    let id = req.params.id;
    const tour = tours.find(el => el.id === parseInt(id));
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid'
        })
    }
    tour.description = req.body.description;
    return res.status(200).json({
        status: 'fail',
        data: {
            tour
        }
    })
}

exports.deleteTour = (req, res) => {
    let id = req.params.id;
    res.status(204).json({
        status: 'sucess',
        data: null,
    })
}