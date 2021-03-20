const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const Schema = mongoose.Schema;

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
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    }
});

ShelterSchema.plugin(idValidator);
const Shelter = mongoose.model("Shelter", ShelterSchema);
module.exports = Shelter;