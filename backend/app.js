const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require('./models/posts')
const Image = require('./models/image')
const User = require('./models/user')
require('dotenv/config')


const app = express()
app.use(cors())


app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit:'50mb'}));

var port = process.env.PORT || '3000'


mongoose.connect(
    "mongodb://localhost:27017/admin",
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to Server");
        }
    }
)



app.post('/getuserposts', async (req, res) => {
    console.log('POST request at /getuserposts');
    let uid = req.body.uid
    try {
        let postList = await Post.find({uid: uid})
        res.send(postList)
    } catch(err) {
        console.log(err);
    }
})

app.post('/getuserimages', async (req, res) => {
    console.log('POST request at /getuserimages');
    let uid = req.body.uid
    try {
        let imageList = await Image.find({uid: uid})
        res.send(imageList)
    } catch(err) {
        console.log(err);
    }
})

app.post('/getpost', async (req, res) => {
    console.log('POST request at /getpost');
    let pid = req.body.pid
    try {
        let post = await Post.find({_id: pid})
        res.send(post)
    } catch(err) {
        console.log(err);
    }
})

app.post('/getimage', async (req, res) => {
    console.log('POST request at /getimage');
    let pid = req.body.pid
    try {
        let image = await Image.find({_id: pid})
        res.send(image)
    } catch(err) {
        console.log(err);
    }
})

app.post('/addpost', async (req, res) => {
    console.log('POST request at /addpost');

    var newPost = {
        uid: req.body.uid,
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
    }


    await Post.create(newPost, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send("Successful")
        }
    })

})

app.post('/addimage', async (req, res) => {
    console.log('POST request at /addimage');

    var newImage = {
        uid: req.body.uid,
        image: req.body.image,
    }


    await Image.create(newImage, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send("Successful")
        }
    })

})


app.post('/deletepost', async (req, res) => {
    console.log('POST request at /deletepost');
    let pid = req.body.pid
    try {
        let post = await Post.deleteMany({_id: pid})
        res.send("Deleted!")
    } catch(err) {
        console.log(err);
    }
})

app.post('/deleteimage', async (req, res) => {
    console.log('POST request at /deleteimage');
    let pid = req.body.pid
    try {
        let image = await Image.deleteMany({_id: pid})
        res.send("Deleted!")
    } catch(err) {
        console.log(err);
    }
})

app.post('/login', async(req, res) => {
    console.log('POST request at /login');
    let uid = req.body.uid;
    let pass = req.body.pass;
    let real_pass = await User.findOne({uid: uid})
    real_pass = real_pass.password;
    if(real_pass != null) {
        if(real_pass == pass) {
            res.send("Verified")
        } else {
            res.send("Wrong password")
        }
    } else {
        res.send("No User Found")
    }

})

app.post('/register', async(req, res) => {
    console.log('POST request at /register');
    const userObj = {
        email: req.body.email,
        uid: req.body.uid,
        password: req.body.password,
        about: req.body.about,
        mobile: req.body.mobile,
        birthday: req.body.birthday,
        gender: req.body.gender,
        blood_group: req.body.blood_group,
        country: req.body.country,
        occupation: req.body.occupation,
        hobbies: req.body.hobbies,
        education: req.body.education,
        workExp: req.body.workExp,
        other: req.body.other,
    }

    await User.create(userObj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send("Successful")
        }
    })

})

app.listen(port, err => {
    if (err)
        throw err
    console.log(`Server listening on port ${port}..........`)
})