const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
const ReviewSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fromName: String,
    datetime: Date,
    text: {
        type: String,
        required: true
    },
    food: {
        type: Number,
        required: true
    },
    interior: {
        type: Number,
        required: true,
    },
    service: {
        type: Number,
        required: true,
    }
});
const ShelterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    images: [ImageSchema],
    reviews: [ReviewSchema],
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    }
});

ShelterSchema.plugin(idValidator);
const Shelter = mongoose.model("Shelter", ShelterSchema);
module.exports = Shelter;