const express = require('express');
const router = express.Router();
const config = require("../config");
const Shelter = require("../models/Shelter");
const auth = require('../middleware/auth');
const permit = require("../middleware/permit");

router.post("/", auth, async (req, res) => {

});

router.post("/photo", [auth, config.upload.single("image")], async (req, res) => {
    const shelter = await Shelter.findById(req.body.to);
    let imageData = req.body;
    if (req.file) {
        imageData.image = req.file.filename;
    }
    try {
        await shelter.updateOne({$push: {images: imageData}});
        res.send({message: 'success'});
    } catch (e) {
        res.status(400).send(e);
    }

});

router.delete("/:id", [auth, permit("admin")], async (req, res) => {

});

router.delete("/photo/:id", [auth, permit("admin")], async (req, res) => {
    const shelter = await Shelter.findById(req.params.id);
    try {
        await shelter.updateOne({$pull: {images: {_id: req.params._id}}});
        res.send({message: "Success"});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;