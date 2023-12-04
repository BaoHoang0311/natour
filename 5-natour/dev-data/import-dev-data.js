const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' })
const Tour = require('../models/tourModel');
const uri = process.env.DATABASE;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successfull');
});

const data = JSON.parse(fs.readFileSync('../dev-data/data/tours-simple.json', 'utf-8'));
const importData = async () => {
    try {
        await Tour.create(data);
        console.log('data import success');
    }
    catch (err) {
        console.log(err)
    }
    process.exit();
}
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('data successfully deleted!');
    }
    catch (err) {
        console.log(err);
    }
    process.exit();
}
console.log(process.argv)
if (process.argv[2] == '--import') {
    importData();
}
else if(process.argv[2] == '--delete'){
    deleteData();
}
