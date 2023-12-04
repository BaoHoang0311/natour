const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
const uri = process.env.DATABASE


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successfull');
});

//! Create schema

// const tourSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'A tour must have a name'],
//         unique: true,
//     },
//     ratting: {
//         type: Number,
//         default: 4.5
//     },
//     price: {
//         type: Number,
//         required: [true, 'A tour must have a price'],
//     },
// })
// const Tour = mongoose.model('Tour',tourSchema);
// const testTours = new Tour({
//     name: "The Park Camper",
//     ratting: 4.7,
//     price: 4.56,
// })

// testTours.save().then(doc=>{
//     console.log(doc);
// }).catch(err=> console.log('Error',err))
//# endrgion



console.log(process.env.NODE_ENV)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});