const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Shelter = require("./models/Shelter");

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("users");

    } catch (e) {
        console.log("Collection were not presented!");
    }

    const [user, admin] = await User.create({
        email: "asd@asd.asd",
        password: "123",
        token: nanoid(),
        role: "user",
        displayName: "Vegard",
    }, {
        email: "qwe@qwe.qwe",
        password: "123",
        token: nanoid(),
        role: "admin",
        displayName: "Admin"
    });

    const [Leprecon, Buddha, River] = await Shelter.create({
        name: "Leprecon Bar",
        image: "1.jpeg",
        user: user._id,
        images: [{image: '4.jpeg', from: user._id},{image: '5.jpeg', from: user._id},{image: '6.jpeg', from: user._id},],
        reviews: [{
            from: user._id,
            fromName: user.displayName,
            text: 'You can display a label on hover to help users pick the correct rating value. The demo uses the onChangeActive prop.',
            food: 5,
            interior: 4,
            service: 3
        },
            {
                from: user._id,
                fromName: user.displayName,
                text: 'You can display a label on hover to help users pick the correct rating value. The demo uses the onChangeActive prop.' ,
                food: 2,
                interior: 5,
                service: 4
            }],
        description: 'Enjoy a drink in our spacious lounge bar, is a truly enjoyable experience – the views of the natural harbour, no ships just a variety of birds and may be even spot a stray seal or penguin and then across the water with the opposite side comprising of natural terrain, with the names of ships picked out by natural stones will help to ensure that you will have a “relaxing drink”'
    }, {
        name: "Buddha Bar",
        image: "2.jpeg",
        user: user._id,
        images: [{image: '7.jpeg', from: user._id},{image: '8.jpeg', from: user._id},{image: '9.jpeg', from: user._id},],
        reviews: [],
        description: 'There is a full range of bar drinks including a wide selection of spirits, Whisky, Brandy and Liqueurs, soft drinks and  beer including and Falkland Islands only real ale.  The wine list includes a variety and styles of wine including the famous Montes premium wine produced in Chile, with wines by the bottle and glass.'
    }, {
        name: "River Pub",
        image: "3.jpeg",
        user: admin._id,
        images: [{image: '4.jpeg', from: user._id},{image: '6.jpeg', from: user._id},],
        reviews: [],
        description: 'Our menu is based on the principles of using the high quality raw local ingredients, along with the best of ingredients imported from around the world, freshly cooked and presented by our head chef Matt Clarke and his team with care and attention. There is a wide selection to choose from, including fresh fish, char-grills, ala’carte selections and special menus.'
    });

    db.close();
});