const mongoose = require("mongoose");

const express = require('express');
const {host, port, db} = require("./configuration");
const {connectDb} = require("./helpers/db");

const app = express();

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Starting api service at port:${port}`);
        console.log(`On host ${host}`);
        console.log(`Our db ${db}`);

        const silence = new Post({name: 'Silence'});
        console.log(silence);

        Post.find((err, posts) => {
            if (err) console.error(err);
            console.log('find:', posts);

            silence.save((err, d) => {
                if (err) console.error(err);
                console.log('saved:', d);

                Post.find((err, posts) => {
                    if (err) console.error(err);
                    console.log('find:', posts);
                });
            });
        });




    });
};

app.get('/test', ((req, res) => {
    res.send('Our api service is working correctly');
}));

connectDb()
.on('error', console.log)
.on('disconnected', connectDb)
.once('open', startServer);

