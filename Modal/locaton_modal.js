// models/Location.js
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});


LocationSchema.index({ location: '2dsphere' });


const Location = mongoose.model('Location', LocationSchema);

export default Location;