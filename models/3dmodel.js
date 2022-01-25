const mongoose = require('mongoose');


// Create Schema
const VRSchema = new mongoose.Schema({
    environmentName: {
        type: String,
        required: true
    },
    environmentCreator: {
        type: String,
        required: true
    },
    environmentOptions:{
        panorama:Boolean,
        preset:String,
        video:String,
        floorAsset:{
            color:String,
            url:String
        },
        skyAsset:{
            color:String,
            url:String
        }
    },
    vrObject: [{
        name:String,
        position:String,
        scale:String,
        rotation:String,
        url:String
    }]   
})

module.exports = mongoose.model('VR', VRSchema)

