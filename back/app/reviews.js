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
    shelter.images.push
});

router.delete("/:id", [auth, permit("admin")], async (req, res) => {

});

router.delete("/photo/:id", [auth, permit("admin")], async (req, res) => {

});

module.exports = router;