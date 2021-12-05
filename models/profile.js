const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required : true
    },
    address :[
        {
            address1 : String,
            address2 : String,
            city : String,
            zip : String,
            state : String,
            country : String
        }
    ]
    

});

module.exports = mongoose.model('UserProfile', UserProfileSchema)

