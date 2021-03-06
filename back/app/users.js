const router = require("express").Router();
const User = require("../models/User");
const config = require("../config");
const axios = require("axios");
const {nanoid} = require("nanoid");

router.post("/", config.upload.single("avatarImage"), async (req, res) => {
    const userData = {
        displayName: req.body.displayName,
        email: req.body.email,
        password: req.body.password,
    }
    const user = new User(userData);
    try {
        user.generateToken();
        await user.save();
        res.send(user);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'});
    }
    user.generateToken();
    await user.save({validateBeforeSave: false});
    return res.send({user});
});

router.delete("/sessions", async (req, res) => {
    const token = req.get("Authorization");
    const success = {message: "Success"};

    if (!token) return res.send(success);

    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generateToken();
    user.save({validateBeforeSave: false});
});

router.post("/facebookLogin", async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.fb.appId + "|" + config.fb.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);
        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }
        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }
        let user = await User.findOne({facebookId: req.body.id});
        console.log(user);
        if (!user) {
            user = new User({
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                fbAvatar: req.body.picture.data.url
            });
        }
        user.generateToken();
        await user.save({validateBeforeSave: false});
        return res.send({message: 'Login or register successful', user});
    } catch (error) {
        return res.status(401).send({message: 'token incorrect'});
    }
});

module.exports = router;