const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.get('/',(req,res)=>{
//     res.status(404).json({
//         message: "hello from the server side",
//         app: "Natour"
//     });
// })

// app.post('/',(req,res)=>{
//     console.log(req.body);
//     res.send("hello");
// })

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
}

const createTour = (req, res) => {
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

const getTour = (req, res) => {
    let id = req.params.id;
    console.log(req.params.id);

    if (id >= tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid'
        })
    }
    const tour = tours.find(el => el.id === parseInt(id))
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        }
    });
}

const updateTour = (req, res) => {
    let id = req.params.id;
    console.log(req.body);

    const tour = tours.find(el => el.id === parseInt(id));
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid'
        })
    }
    tour.description = req.body.description;
    console.log(tour);
    return res.status(200).json({
        status: 'fail',
        data: {
            tour
        }
    })
}

const deleteTour = (req, res) => {
    let id = req.params.id;
    console.log(id);

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }

    res.status(204).json({
        status: 'sucess',
        data: null,
    })
}


// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)
//  aaa
// app.get('/api/v1/tours/:id/:x/:y', (req, res) => {
//     console.log(req.params);
//     res.send('ok')
// })

const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});