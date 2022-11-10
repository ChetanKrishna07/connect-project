const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require('./models/posts')
const Image = require('./models/image')
const User = require('./models/user')
const Conversation = require('./models/conversation')
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



app.post('/getuserdetails', async(req, res) => {
    console.log('POST request at /getuserdetails');
    let uid = req.body.uid
    const user = await User.findOne({uid: uid})
    if(user != null) {
        res.send(user)
    } else {
        res.status(404).send("User not found")
    }
})

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
    let pass = req.body.password;
    let real_pass = await User.findOne({uid: uid})
    if(real_pass != null) {
        real_pass = real_pass.password;
        if(real_pass == pass) {
            res.send("Verified")
        } else {
            res.send("Incorrect password")
        }
    } else {
        res.send("No account Found Please Register")
    }

})

app.post('/getfriends', async(req, res) => {
    console.log('POST request at /getfriends');
    let uid = req.body.uid
    let user = await User.findOne({uid: uid})
    if(user != null) {
        res.send(user.friends)
    } else {
        res.status(404).send("User not found")
    }
})

app.post('/addfriend', async(req, res) => {
    console.log('POST request at /addfriend');
    let uid = req.body.uid
    let friendId = req.body.friendId

    let user = await User.findOne({uid: uid})
    let friend = await User.findOne({uid: friendId})

    if(user != null) {
        if(friend != null) {
            let friends = user.friends
            let friends2 = friend.friends
            let exists = false
            for(var i = 0; i < friends.length; i++) {
                if(friends[i] == friendId) {
                    exists = true
                    break
                }
            }
            if(exists) {
                res.send("Already Friends")
            } else {
                friends.push(friendId)
                friends2.push(uid)
                await User.updateOne({uid: uid}, {friends: friends})
                await User.updateOne({uid: friendId}, {friends: friends2})
                res.send("Friend Added")
            }
        } else {
            res.status(404).send("Friend Not Found")
        }
    } else {
        res.status(404).send("User Not Found")
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
        friends: [],
        dp: null,
    }

    let user = await User.findOne({uid: userObj.uid})

    if(user != null) {
        res.send("Account already exits, try logging in")
    } else {
        await User.create(userObj, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send("Successful")
            }
        })
    }

})

app.post('/addChat', async(req, res) => {
    console.log('POST request at /addChat');
    let cid = req.body.cid
    const newChat = {
        sender: req.body.sender,
        body: req.body.body,
        sendDate: Date.now(),
    }

    const conv = await Conversation.findOne({_id: cid})
    if(conv != null) {
        const messages = conv.chats;
        messages.push(newChat)
    
        await Conversation.updateOne({_id: cid}, {chats: messages, lastUpdate: Date.now()})

        res.send("Successful")
    } else {
        res.status(404).send('no conversation');
    }
})

app.post('/newConvo', async(req, res) => {
    console.log('POST request at /newConvo');

    const newConvo = {
        members: req.body.members,
        chats: []
    }

    await Conversation.create(newConvo, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send("Successful")
        }
    })
})

app.post('/getChats', async(req, res) => {
    console.log('POST request at /getChats');
    
    const cid = req.body.cid;
    try {
        let convo = await Conversation.findOne({_id: cid})
        res.send(convo)
    } catch(err) {
        res.status(404).send('no conversation');
    }
})

app.post('/getConvos', async(req, res) => {
    console.log('POST request at /getUserChats');

    const uid = req.body.uid;

    try {
        let convos = await Conversation.find({members: uid})
        res.send(convos)
    } catch(err) {
        res.status(404).send('no conversation');
    }
})

app.post('/updateDp', async(req, res) => {
    console.log('POST request at /updateDp');
    
    const uid = req.body.uid
    const dp = req.body.image

    if(dp != "") {
        const user = await User.findOne({uid: uid})
        if(user != null) {
            await User.updateOne({uid: uid}, {dp: dp})
            res.send("Updated DP")
        } else {
            res.status(404).send("user not found")
        }
    } else {
        res.send("No img")
    }

})

app.post('/getDp', async(req, res) => {
    console.log('POST request at /getDp');

    const uid = req.body.uid
    const user = await User.findOne({uid: uid})
    if(user != null) {
        let dp = user.dp
        res.send(dp)
    } else {
        res.status(400).send("User not found")
    }
})

app.listen(port, err => {
    if (err)
        throw err
    console.log(`Server listening on port ${port}..........`)
})