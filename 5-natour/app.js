const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/toursrRoute')
const userRouter = require('./routes/userRoute')
const app = express();

// 1) Middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.static(`./public`)); // bỏ public đi {{local}}/img/pin.png

app.use((req, res, next) => {
    console.log("hello from the middleware");
    next();
})

app.use((req, res, next) => {
    req.abcTime = new Date().toISOString()
    next();
})

//! Tour //! User
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

//! 3) Router

// Middleware

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users',userRouter);

// app.get('/api/v1/tours/:id/:x/:y', (req, res) => {
//     const {id, x, y} = req.params
//     console.log(id,x,y);
//     res.send('okkk')
// })


//! 4) Server

module.exports = app;