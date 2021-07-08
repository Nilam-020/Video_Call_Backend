const mongoose = require('mongoose');
const {ObjectId} = require('bson')

const Rating = mongoose.model('Rating', {
    DocID: {
        type: ObjectId
    },
    UID: {
        type: ObjectId
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
})

module.exports=Rating;