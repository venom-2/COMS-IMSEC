const mongoose = require('mongoose');

const connectToDatabase = ()=> {
    try{
        const connection = mongoose.connect("mongodb+srv://kdwivedi343:10lfJ05LuttBZWwF@dms-ims.iabo28u.mongodb.net/");
        console.log("Connected to database");
    } catch(e) {
        console.log("Error occured!");
    }
}

module.exports = connectToDatabase;