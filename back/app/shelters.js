const express = require('express');
const router = express.Router();
const config = require("../config");
const Shelter = require("../models/Shelter");
const auth = require('../middleware/auth');
const permit = require("../middleware/permit");

router.get('/', async (req, res) => {
    const result = await Shelter.find();
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.get('/:id', async (req, res) => {
    const result = await Shelter.findById(req.params.id);
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', [auth, config.upload.single("image")], async (req, res) => {
    const shelterData = req.body;
    shelterData.user = req.user._id;
    if (req.file) {
        shelterData.image = req.file.filename;
    }
    const shelter = new Shelter(shelterData);
    if (req.body.agree === 'false') {
        return res.status(400).send({message: 'You must accept terms'});
    }
    try {
        await shelter.save();
        res.send(shelter);
    } catch (e) {
        res.status(400).send(e);
    }

});

router.delete('/:id', [auth, permit("admin")], async (req, res) => {
    const result = await Shelter.findByIdAndRemove({_id: req.params.id});
    if (result) {
        res.send("Shelter removed");
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;