const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require('./models/posts')
const multer = require('multer')
require('dotenv/config')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser({urlencoded:true}))

var port = process.env.PORT || '3001'

mongoose.connect(
    process.env.MONGO_URL,
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to Server");
        }
    }
)

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// const upload = multer({storage: storage})

app.get('/userposts', async (req, res) => {
    console.log('GET request at /userposts');
    let uid = req.body.uid
    try {
        let postList = await Post.find({uid: uid})
        res.send(postList)
    } catch(err) {
        console.log(err);
    }
})

app.listen(port, err => {
    if (err)
        throw err
    console.log(`Server listening on port ${port}..........`)
})